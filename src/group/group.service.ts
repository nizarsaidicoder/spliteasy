import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}

  async isMemberOfGroup(userId: number, groupId: number): Promise<boolean> {
    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          select: { id: true },
        },
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return group.members.some((member) => member.id === userId);
  }

  // GET /group/:id : Get group by id
  async getGroupById(userId: number, id: number): Promise<Group | null> {
    // check if the current user is a member of the group
    // if not, throw an error

    const group = await this.prismaService.group.findUnique({
      where: { id },
      include: {
        members: {
          select: { id: true },
        },
        expenses: {
          select: { id: true },
        },
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    const isMember = group.members.some((member) => member.id === userId);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const memberIds = group.members.map((member) => member.id);
    const expenseIds = group.expenses.map((expense) => expense.id);

    return new Group(group.id, group.name, memberIds, expenseIds);
  }

  // POST /group : Create group
  async createGroup(
    creatorId: number,
    createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    try {
      const group = await this.prismaService.group.create({
        data: {
          name: createGroupDto.name,
          members: {
            connect: { id: creatorId },
          },
        },
      });
      return new Group(group.id, group.name, [creatorId], []);
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the group' + error,
        500,
      );
    }
  }

  // PATCH /group/:id : Update group
  async updateGroup(
    currentMember: number,

    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const isMember = await this.isMemberOfGroup(currentMember, id);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const updatedGroup = await this.prismaService.group.update({
      where: { id },
      data: {
        name: updateGroupDto.name,
        members: {
          set: [],
          connect: updateGroupDto.members?.map((memberId) => ({
            id: memberId,
          })),
        },
      },
      include: {
        members: {
          select: {
            id: true,
          },
        },
        expenses: {
          select: {
            id: true,
          },
        },
      },
    });
    return new Group(
      updatedGroup.id,
      updatedGroup.name,
      updatedGroup.members.map((member) => member.id),
      updatedGroup.expenses.map((expense) => expense.id),
    );
  }

  // PATCH /group/:id/members/:userId : Add a user to a group
  async addUserToGroup(
    currentMember: number,
    id: number,
    userId: number,
  ): Promise<void> {
    const isMember = await this.isMemberOfGroup(currentMember, id);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    await this.prismaService.group.update({
      where: { id },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
  }
  // DELETE /group/:id/members/:userId : Remove a user from a group
  async removeUserFromGroup(
    currentMember: number,
    id: number,
    userId: number,
  ): Promise<void> {
    const isMember = await this.isMemberOfGroup(currentMember, id);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    await this.prismaService.group.update({
      where: { id },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
  }
}
