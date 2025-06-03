import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { ExpenseCategory } from '@prisma/client';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
export class ExpenseCategoriesController
{
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService)
  {}

  @Post()
  @HttpCode(201)
  createOne(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory>
  {
    return this.expenseCategoriesService.createOne(createExpenseCategoryDto);
  }

  @Get()
  @HttpCode(200)
  getAll(): Promise<ExpenseCategory[]>
  {
    return this.expenseCategoriesService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): Promise<ExpenseCategory | null>
  {
    return this.expenseCategoriesService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory>
  {
    return this.expenseCategoriesService.updateOne(id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void>
  {
    return this.expenseCategoriesService.deleteOne(id);
  }

  @Get('name/:name')
  @HttpCode(200)
  getByName(@Param('name') name: string): Promise<ExpenseCategory | null>
  {
    return this.expenseCategoriesService.getByName(name);
  }
}
