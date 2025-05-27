import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from '@prisma/prisma.module';
import { UsersModule } from '@users/users.module';
import { GroupsService } from '@src/groups/groups.service';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [PrismaModule, UsersModule, GroupsService],
})
export class ExpensesModule
{}
