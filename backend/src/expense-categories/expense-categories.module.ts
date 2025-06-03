import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  providers: [ExpenseCategoriesService],
  controllers: [ExpenseCategoriesController],
  imports: [PrismaModule],
  exports: [ExpenseCategoriesService], // Exporting ExpenseCategoriesService to be used in other modules
})
export class ExpenseCategoriesModule
{}
