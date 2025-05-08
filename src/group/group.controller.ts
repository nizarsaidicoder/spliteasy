import {
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/auth.guard';
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}
  // TODO : Add a route that gets a token (the token contains the group id and expiration) then add a user to the group

  @Post()
  @HttpCode(201)
  create(
    @CurrentUser() user: UserPayload,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.groupService.createGroup(user.sub, createGroupDto);
  }

  @Get(':id')
  @HttpCode(200)
  getGroupById(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    return this.groupService.getGroupById(user.sub, parseInt(id));
  }

  @Patch(':id')
  @HttpCode(204)
  update(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(
      user.sub,
      parseInt(id),
      updateGroupDto,
    );
  }

  @Post(':id/members')
  @HttpCode(201)
  addMultipleMembers(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body() members: number[],
  ) {
    return this.groupService.updateGroup(user.sub, parseInt(id), {
      members,
    });
  }

  @Post(':id/members/:userId')
  @HttpCode(204)
  addSingleMember(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.addUserToGroup(
      user.sub,
      parseInt(id),
      parseInt(userId),
    );
  }

  @Delete(':id/members/me')
  @HttpCode(204)
  removeMe(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    return this.groupService.removeUserFromGroup(
      user.sub,
      parseInt(id),
      user.sub,
    );
  }

  @Delete(':id/members/:userId')
  @HttpCode(204)
  removeSingleMember(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.removeUserFromGroup(
      user.sub,
      parseInt(id),
      parseInt(userId),
    );
  }
}
