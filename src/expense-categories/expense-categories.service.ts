import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class ExpenseCategoriesService
{
  constructor(private prismaService: PrismaService)
  {}

  // Example methods could include:
  // - createExpenseCategory(createExpenseCategoryDto: CreateExpenseCategoryDto)
  // - updateExpenseCategory(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto)
  // - deleteExpenseCategory(id: number)
  // - getExpenseCategoryById(id: number)
  // - getAllExpenseCategories()

  async createOne(createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>
  {
    return this.prismaService.category.create({
      data: {
        name: createExpenseCategoryDto.name,
        icon: createExpenseCategoryDto.icon,
      },
    });
  }

  async getAll(): Promise<Category[]>
  {
    return this.prismaService.category.findMany();
  }
  async getById(id: number): Promise<Category | null>
  {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category)
    {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateOne(id: number, updateExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>
  {
    return this.prismaService.category.update({
      where: { id },
      data: {
        name: updateExpenseCategoryDto.name,
        icon: updateExpenseCategoryDto.icon,
      },
    });
  }
  async deleteOne(id: number): Promise<void>
  {
    await this.prismaService.category.delete({
      where: { id },
    });
  }
  async getByName(name: string): Promise<any>
  {
    return this.prismaService.category.findFirst({
      where: { name },
    });
  }
}
