import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import authConfig from './config/auth.config';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    ExpensesModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [authConfig],
    }),
    ExpenseCategoriesModule,
  ],
  providers: [AppService],
})
export class AppModule
{}
