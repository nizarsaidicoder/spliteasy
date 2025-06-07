import { Controller, Get, HttpCode, Post, Param, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { UserPayload } from '@app-types/user-payload.type';
import { AddUsersDto } from './dto/add-users.dto';
@Controller('groups')
export class GroupsController
{
  constructor(private groupService: GroupsService)
  {}
  //Add a route that returns an invite link to the group
  @Get(':id/invite')
  @HttpCode(200)
  getInviteLink(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) groupId: number)
  {
    return this.groupService.getInviteLink(user.sub, groupId);
  }

  @Post('join/:token')
  @HttpCode(200)
  joinGroup(@CurrentUser() user: UserPayload, @Param('token') token: string)
  {
    return this.groupService.joinGroup(user.sub, token);
  }

  @Post()
  @HttpCode(201)
  create(@CurrentUser() user: UserPayload, @Body() createGroupDto: CreateGroupDto)
  {
    return this.groupService.create(user.sub, createGroupDto);
  }

  @Get(':id')
  @HttpCode(200)
  getGroupById(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number)
  {
    return this.groupService.getById(user.sub, id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number, @Body() updateGroupDto: UpdateGroupDto)
  {
    return this.groupService.update(user.sub, id, updateGroupDto);
  }

  @Post(':id/members')
  @HttpCode(201)
  addMultipleMembers(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number, @Body() payload: AddUsersDto)
  {
    return this.groupService.addUsers(user.sub, id, payload.members);
  }

  @Post(':id/members/:userId')
  @HttpCode(204)
  addSingleMember(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number)
  {
    return this.groupService.addUser(user.sub, id, userId);
  }

  @Delete(':id/members/:userId')
  @HttpCode(204)
  removeSingleMember(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number, @Param('userId', ParseIntPipe) userId: number)
  {
    return this.groupService.removeUser(user.sub, id, userId);
  }

  @Delete(':id/members/me')
  @HttpCode(204)
  removeMe(@CurrentUser() user: UserPayload, @Param('id', ParseIntPipe) id: number)
  {
    return this.groupService.removeUser(user.sub, id, user.sub);
  }
}
