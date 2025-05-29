import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from '@prisma/client';
import { CurrentUser } from '@decorators/current-user.decorator';
import { UserPayload } from '@app-types/user-payload.type';
import { ConversionMode } from '@app-types/conversion-mode.type';

@Controller('expenses')
export class ExpensesController
{
  constructor(private readonly expenseService: ExpensesService)
  {}

  // GET /expense/:id : Get a specific expense by ID
  @Get(':id')
  async getOneById(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number): Promise<Expense | null>
  {
    return this.expenseService.getOneById(user.sub, id);
  }

  // POST /expense : Create a new expense
  @Post()
  async createOne(@CurrentUser() user: UserPayload, @Body() createExpenseDto: CreateExpenseDto, @Query('mode') mode: ConversionMode = 'amount'): Promise<Expense>
  {
    return this.expenseService.createOne(user.sub, createExpenseDto, mode);
  }

  // GET /expense/group/:groupId : Get all expenses for a group
  @Get('/group/:groupId')
  async getSomeOfGroup(@CurrentUser() user: UserPayload, @Param('groupId', ParseIntPipe) groupId: number): Promise<Expense[]>
  {
    return this.expenseService.getSomeOfGroup(user.sub, groupId);
  }

  // PATCH /expense/:id : Update an expense
  @Patch(':id')
  async updateOne(
    @CurrentUser() user: UserPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Query('mode') mode: ConversionMode = 'amount',
  ): Promise<Expense>
  {
    return this.expenseService.updateOne(user.sub, id, updateExpenseDto, mode);
  }

  // DELETE /expense/:id : Delete an expense
  @Delete(':id')
  async deleteOne(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number): Promise<void>
  {
    return this.expenseService.deleteOne(user.sub, id);
  }
}
