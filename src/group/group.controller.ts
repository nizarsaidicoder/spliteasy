import {
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { GroupService } from './group.service';

export class CreateGroupDto {
  name: string;
  description: string;
  members: number[];
}

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  // GET /group/:id : Get group by id
  @Get(':id')
  @HttpCode(200)
  getGroupById(@Param('id') id: string) {
    return this.groupService.getGroupById(parseInt(id));
  }
  // POST /group : Create group
  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }
  // PATCH /group/:id : Update group
  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() createGroupDto: CreateGroupDto) {
    return this.groupService.updateGroup(parseInt(id), createGroupDto);
  }
  // GET /group/:id/members : Get all members of a group
  @Get(':id/members')
  @HttpCode(200)
  getMembers(@Param('id') id: string) {
    return this.groupService.getGroupMembers(parseInt(id));
  }
  // POST /group/:id/members : Add multiple users to a group
  @Post(':id/members')
  @HttpCode(201)
  addMembers(@Param('id') id: string, @Body() members: number[]) {
    return this.groupService.updateGroup(parseInt(id), {
      members,
    } as CreateGroupDto);
  }
  // PATCH /group/:id/members/:userId : Add a user to a group

  @Patch(':id/members/:userId')
  @HttpCode(204)
  addMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupService.addUserToGroup(parseInt(id), parseInt(userId));
  }
  // DELETE /group/:id/members/:userId : Remove a user from a group
  @Post(':id/members/:userId')
  @HttpCode(204)
  removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupService.removeUserFromGroup(
      parseInt(id),
      parseInt(userId),
    );
  }
}
