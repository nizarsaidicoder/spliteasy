import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GroupsService } from '@src/groups/groups.service'; // Assuming you have a GroupsService to handle group-related logic
import { ExpenseCategory, Expense, Prisma } from '@prisma/client';
import { ConversionMode } from '@app-types/conversion-mode.type';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseCategoriesService } from '@src/expense-categories/expense-categories.service';

@Injectable()
export class ExpensesService
{
  constructor(
    private prismaService: PrismaService,
    private groupsService: GroupsService,
    private expenseCategoriesService: ExpenseCategoriesService,
  )
  {}
  async createOne(userId: number, createExpenseDto: CreateExpenseDto, mode: ConversionMode)
  {
    const group = await this.groupsService.getById(userId, createExpenseDto.groupId);
    if (!group)
    {
      throw new NotFoundException(`Group with ID ${createExpenseDto.groupId} not found`);
    }

    await this.groupsService.isMember(userId, createExpenseDto.groupId);

    const shares = this.calculateShares(createExpenseDto.amount, createExpenseDto.shares, mode);

    if (createExpenseDto.shares.some((share) => !share.userId || !share.amount))
    {
      throw new ForbiddenException('Each share must have a userId and an amount');
    }
    if (createExpenseDto.shares.length > group.members.length)
    {
      throw new ForbiddenException('The number of shares cannot exceed the number of group members');
    }
    if (createExpenseDto.shares.some((share) => share.amount <= 0))
    {
      throw new ForbiddenException('Share amounts must be greater than zero');
    }
    if (createExpenseDto.shares.some((share) => !group.members.some((member) => member === share.userId)))
    {
      throw new ForbiddenException('All shares must belong to members of the group');
    }

    const totalShareAmount = shares.reduce((acc, share) => acc + share.amount, 0);
    if (totalShareAmount !== createExpenseDto.amount)
    {
      throw new ForbiddenException('The total amount of shares must equal the expense amount');
    }
    let category: ExpenseCategory | null = null;
    if (createExpenseDto.categoryId)
    {
      category = await this.expenseCategoriesService.getById(createExpenseDto.categoryId);
    }

    const expense = await this.prismaService.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
        groupId: createExpenseDto.groupId,
        userId: createExpenseDto.userId,
        date: createExpenseDto.date,
        categoryId: category ? category.id : undefined,
        shares: {
          create: shares.map((share) => ({
            userId: share.userId,
            amount: share.amount,
          })),
        },
      },
      include: {
        group: true,
        shares: true,
      },
    });
    return expense;
  }
  async getOneById(userId: number, id: number): Promise<Expense | null>
  {
    const expense = await this.prismaService.expense.findUnique({
      where: { id },
      include: { group: { include: { members: true } } },
    });

    if (!expense)
    {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    const isMember = expense.group.members.some((member) => member.id === userId);
    if (!isMember)
    {
      throw new ForbiddenException('You are not a member of the group associated with this expense');
    }

    return expense;
  }
  async getSomeOfGroup(userId: number, groupId: number)
  {
    const group = await this.groupsService.getById(userId, groupId);
    if (!group)
    {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    await this.groupsService.isMember(userId, groupId);

    const expenses = await this.prismaService.expense.findMany({
      where: { groupId },
      include: { shares: true },
    });

    return expenses;
  }
  async getSomeOfUser(userId: number): Promise<Expense[]>
  {
    // look for all the user groups
    const shares = await this.prismaService.share.findMany({
      where: { userId },
      include: { expense: true },
    });

    const expenses = await this.prismaService.expense.findMany({
      where: { id: { in: shares.map((share) => share.expenseId) } },
      include: { shares: true, group: true },
    });

    if (!expenses || expenses.length === 0)
    {
      return [];
    }

    return expenses;
  }
  async updateOne(userId: number, id: number, updateExpenseDto: UpdateExpenseDto, mode: ConversionMode = 'amount')
  {
    const expense = await this.prismaService.expense.findUnique({
      where: { id },
      include: { group: { include: { members: true } } },
    });

    if (!expense)
    {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    const isMember = expense.group.members.some((member) => member.id === userId);
    if (!isMember)
    {
      throw new ForbiddenException('You are not a member of the group associated with this expense');
    }
    let shares: Array<{ userId: number; amount: number }> = [];
    if (updateExpenseDto.shares && updateExpenseDto.shares?.length !== 0)
    {
      // Validate shares
      if (updateExpenseDto.shares.some((share) => !share.userId || !share.amount))
      {
        throw new ForbiddenException('Each share must have a userId and an amount');
      }
      if (updateExpenseDto.shares.length > expense.group.members.length)
      {
        throw new ForbiddenException('The number of shares cannot exceed the number of group members');
      }
      if (updateExpenseDto.shares.some((share) => share.amount <= 0))
      {
        throw new ForbiddenException('Share amounts must be greater than zero');
      }
      if (updateExpenseDto.shares.some((share) => !expense.group.members.some((member) => member.id === share.userId)))
      {
        throw new ForbiddenException('All shares must belong to members of the group');
      }

      shares = this.calculateShares(expense.amount, updateExpenseDto.shares, mode);
      const totalShareAmount = shares.reduce((acc, share) => acc + share.amount, 0);
      if (totalShareAmount !== updateExpenseDto.amount)
      {
        throw new ForbiddenException('The total amount of shares must equal the expense amount');
      }
    }

    const updatePayload: Prisma.ExpenseUpdateInput = {
      name: updateExpenseDto.name,
      description: updateExpenseDto.description,
      amount: updateExpenseDto.amount,
    };
    if (shares.length !== 0)
    {
      updatePayload.shares = {
        deleteMany: {},
        create: shares.map((share) => ({
          userId: share.userId,
          amount: share.amount,
        })),
      };
    }
    if (updateExpenseDto.date)
    {
      updatePayload.date = updateExpenseDto.date;
    }
    if (updateExpenseDto.categoryId)
    {
      const category = await this.expenseCategoriesService.getById(updateExpenseDto.categoryId);
      if (!category)
      {
        throw new NotFoundException(`ExpenseCategory with ID ${updateExpenseDto.categoryId} not found`);
      }
      updatePayload.category = {
        connect: { id: updateExpenseDto.categoryId },
      };
    }

    const updatedExpense = await this.prismaService.expense.update({
      where: { id },
      data: updatePayload,
      include: { shares: true },
    });
    return updatedExpense;
  }
  async deleteOne(userId: number, id: number)
  {
    const expense = await this.prismaService.expense.findUnique({
      where: { id },
      include: { group: { include: { members: true } } },
    });

    if (!expense)
    {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    if (userId !== expense.userId)
    {
      throw new ForbiddenException('You are not the owner of this expense');
    }

    await this.prismaService.expense.delete({
      where: { id },
    });
  }

  private calculateShares(amount: number, shares: Array<{ userId: number; amount: number }>, mode: ConversionMode): Array<{ userId: number; amount: number }>
  {
    switch (mode)
    {
      case 'part':
      {
        const totalParts = shares.reduce((acc: number, share: { userId: number; amount: number }) => acc + share.amount, 0);
        return shares.map((share: { userId: number; amount: number }) => ({
          userId: share.userId,
          amount: (share.amount / totalParts) * amount,
        }));
      }
      case 'percentage':
      {
        return shares.map((share: { userId: number; amount: number }) => ({
          userId: share.userId,
          amount: (share.amount / 100) * amount,
        }));
      }
      case 'amount':
      {
        return shares.map((share: { userId: number; amount: number }) => ({
          userId: share.userId,
          amount: share.amount,
        }));
      }
      default:
        return shares;
    }
  }
}
