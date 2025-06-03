import { Controller, Get, HttpCode, Post, Param, Body, Patch, Delete } from '@nestjs/common';
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
  // TODO : Add a route that gets a token (the token contains the group id and expiration) then add a user to the group

  @Post()
  @HttpCode(201)
  create(@CurrentUser() user: UserPayload, @Body() createGroupDto: CreateGroupDto)
  {
    return this.groupService.create(user.sub, createGroupDto);
  }

  @Get(':id')
  @HttpCode(200)
  getGroupById(@CurrentUser() user: UserPayload, @Param('id') id: string)
  {
    return this.groupService.getById(user.sub, parseInt(id));
  }

  @Patch(':id')
  @HttpCode(204)
  update(@CurrentUser() user: UserPayload, @Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto)
  {
    return this.groupService.update(user.sub, parseInt(id), updateGroupDto);
  }

  @Post(':id/members')
  @HttpCode(201)
  addMultipleMembers(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body()
    payload: AddUsersDto,
  )
  {
    return this.groupService.addUsers(user.sub, parseInt(id), payload.members);
  }

  @Post(':id/members/:userId')
  @HttpCode(204)
  addSingleMember(@CurrentUser() user: UserPayload, @Param('id') id: string, @Param('userId') userId: string)
  {
    return this.groupService.addUser(user.sub, parseInt(id), parseInt(userId));
  }

  @Delete(':id/members/:userId')
  @HttpCode(204)
  removeSingleMember(@CurrentUser() user: UserPayload, @Param('id') id: string, @Param('userId') userId: string)
  {
    return this.groupService.removeUser(user.sub, parseInt(id), parseInt(userId));
  }

  @Delete(':id/members/me')
  @HttpCode(204)
  removeMe(@CurrentUser() user: UserPayload, @Param('id') id: string)
  {
    return this.groupService.removeUser(user.sub, parseInt(id), user.sub);
  }
}
