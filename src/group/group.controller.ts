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

export class CreateGroupDto {
  name: string;
  description: string;
  members: number[];
}

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}
  // TODO : Add a route that gets a token (the token contains the group id and expiration) then add a user to the group

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get(':id')
  @HttpCode(200)
  getGroupById(@Param('id') id: string) {
    return this.groupService.getGroupById(parseInt(id));
  }
  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(parseInt(id), updateGroupDto);
  }
  @Get(':id/members')
  @HttpCode(200)
  getMembers(@Param('id') id: string) {
    return this.groupService.getGroupMembers(parseInt(id));
  }
  @Post(':id/members')
  @HttpCode(201)
  addMultipleMembers(@Param('id') id: string, @Body() members: number[]) {
    return this.groupService.updateGroup(parseInt(id), {
      members,
    } as CreateGroupDto);
  }

  @Post(':id/members/:userId')
  @HttpCode(204)
  addSingleMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupService.addUserToGroup(parseInt(id), parseInt(userId));
  }
  @Delete(':id/members/:userId')
  @HttpCode(204)
  removeSingleMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupService.removeUserFromGroup(
      parseInt(id),
      parseInt(userId),
    );
  }
}
