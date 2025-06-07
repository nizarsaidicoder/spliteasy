import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [PrismaModule, UsersModule, JwtModule],
  exports: [GroupsService],
})
export class GroupsModule
{}
