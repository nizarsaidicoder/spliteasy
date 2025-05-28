import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [PrismaModule, UsersModule],
  exports: [GroupsService], // Exporting GroupsService to be used in other modules
})
export class GroupsModule
{}
