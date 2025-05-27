import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entity/expense.entity';

@Controller('expense')
export class ExpenseController
{
  constructor(private readonly expenseService: ExpenseService)
  {}

  // POST /expense : Create a new expense
  @Post()
  async createExpense(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense>
  {
    return this.expenseService.createExpense(createExpenseDto);
  }

  // GET /expense/:id : Get a specific expense by ID
  @Get(':id')
  async getExpenseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Expense>
  {
    return this.expenseService.getExpenseById(id);
  }

  // GET /expense/group/:groupId : Get all expenses for a group
  @Get('/group/:groupId')
  async getExpensesByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<Expense[]>
  {
    return this.expenseService.getExpensesByGroup(groupId);
  }

  // PATCH /expense/:id : Update an expense
  @Patch(':id')
  async updateExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense>
  {
    return this.expenseService.updateExpense(id, updateExpenseDto);
  }

  // DELETE /expense/:id : Delete an expense
  @Delete(':id')
  async deleteExpense(@Param('id', ParseIntPipe) id: number): Promise<void>
  {
    return this.expenseService.deleteExpense(id);
  }
}
