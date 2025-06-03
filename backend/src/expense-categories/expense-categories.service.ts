import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { PrismaService } from '@prisma/prisma.service';
import { ExpenseCategory } from '@prisma/client';

@Injectable()
export class ExpenseCategoriesService
{
  constructor(private prismaService: PrismaService)
  {}
  async createOne(createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>
  {
    return await this.prismaService.expenseCategory.create({
      data: {
        name: createExpenseCategoryDto.name,
        icon: createExpenseCategoryDto.icon,
      },
    });
  }

  async getAll(): Promise<ExpenseCategory[]>
  {
    return await this.prismaService.expenseCategory.findMany();
  }
  async getById(id: number): Promise<ExpenseCategory | null>
  {
    const category = await this.prismaService.expenseCategory.findUnique({
      where: { id },
    });
    if (!category)
    {
      throw new NotFoundException(`ExpenseCategory with ID ${id} not found`);
    }
    return category;
  }

  async updateOne(id: number, updateExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>
  {
    const existingCategory = await this.prismaService.expenseCategory.findUnique({
      where: { id },
    });
    if (!existingCategory)
    {
      throw new NotFoundException(`ExpenseCategory with ID ${id} not found`);
    }

    const category = await this.prismaService.expenseCategory.update({
      where: { id },
      data: {
        name: updateExpenseCategoryDto.name,
        icon: updateExpenseCategoryDto.icon,
      },
    });
    return category;
  }
  async deleteOne(id: number): Promise<void>
  {
    const existingCategory = await this.prismaService.expenseCategory.findUnique({
      where: { id },
    });
    if (!existingCategory)
    {
      throw new NotFoundException(`ExpenseCategory with ID ${id} not found`);
    }
    await this.prismaService.expenseCategory.delete({
      where: { id },
    });
  }
  async getByName(name: string): Promise<any>
  {
    return await this.prismaService.expenseCategory.findFirst({
      where: { name },
    });
  }
}
