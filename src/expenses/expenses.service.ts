import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersService } from '@users/users.service';
import { GroupsService } from '@src/groups/groups.service'; // Assuming you have a GroupsService to handle group-related logic
import { Expense, Prisma } from '@prisma/client';
import { ConversionMode } from '@app-types/conversion-mode.type';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService
{
  // getOneById(user.sub, id);
  // createOne(user.sub, createExpenseDto, mode);
  // getSomeOfGroup(user.sub, groupId);
  // updateOne(user.sub, id, updateExpenseDto);
  // deleteOne(user.sub, id);

  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
    private groupsService: GroupsService,
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

    const expense = await this.prismaService.expense.create({
      data: {
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
        groupId: createExpenseDto.groupId,
        userId: createExpenseDto.userId,
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
      shares = this.calculateShares(expense.amount, updateExpenseDto.shares, mode);
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

    const isMember = expense.group.members.some((member) => member.id === userId);
    if (!isMember)
    {
      throw new ForbiddenException('You are not a member of the group associated with this expense');
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
