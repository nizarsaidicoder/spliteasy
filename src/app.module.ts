import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GroupModule } from './group/group.module';
import { ExpenseModule } from './expense/expense.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    GroupModule,
    ExpenseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
