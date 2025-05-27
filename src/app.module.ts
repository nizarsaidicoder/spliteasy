import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ExpensesModule } from './expenses/expenses.module';
import authConfig from './config/auth.config';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [authConfig],
    }),
    GroupsModule,
    ExpensesModule,
  ],
  providers: [AppService],
})
export class AppModule
{}
