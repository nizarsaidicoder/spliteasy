import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from '@prisma/prisma.module';
import { UsersModule } from '@users/users.module';
import { GroupsModule } from '@src/groups/groups.module';
import { ExpenseCategoriesModule } from '@src/expense-categories/expense-categories.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [PrismaModule, UsersModule, GroupsModule, ExpenseCategoriesModule],
})
export class ExpensesModule
{}
