import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}

  // GET /group/:id : Get group by id
  async getGroupById(id: number): Promise<Group | null> {
    try {
      const group = await this.prismaService.group.findUnique({
        where: { id },
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
      const members = group?.members.map((member) => member.id) || [];
      const expenses = group?.expenses.map((expense) => expense.id) || [];
      return new Group(group?.id || 0, group?.name || '', members, expenses);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error('An error occurred while fetching the group');
    }
  }

  //   POST /group : Create group

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const group = await this.prismaService.group.create({
        data: {
          name: createGroupDto.name,
          members: {
            connect: createGroupDto.members.map((memberId) => ({
              id: memberId,
            })),
          },
        },
      });
      return new Group(group.id, group.name, createGroupDto.members, []);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Group already exists');
      }
      throw new Error('An error occurred while creating the group');
    }
  }

  // PATCH /group/:id : Update group
  async updateGroup(
    id: number,
    updateGroupDto: CreateGroupDto,
  ): Promise<Group> {
    try {
      const group = await this.prismaService.group.update({
        where: { id },
        data: {
          name: updateGroupDto.name,
          members: {
            set: [],
            connect: updateGroupDto.members.map((memberId) => ({
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
        group.id,
        group.name,
        group.members.map((member) => member.id),
        group.expenses.map((expense) => expense.id),
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error('An error occurred while updating the group');
    }
  }

  // GET /group/:id/members : Get all members of a group
  async getGroupMembers(id: number): Promise<number[]> {
    try {
      const group = await this.prismaService.group.findUnique({
        where: { id },
        include: {
          members: {
            select: {
              id: true,
            },
          },
        },
      });
      return group?.members.map((member) => member.id) || [];
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error('An error occurred while fetching the group members');
    }
  }
  // PATCH /group/:id/members/:userId : Add a user to a group
  async addUserToGroup(id: number, userId: number): Promise<void> {
    try {
      await this.prismaService.group.update({
        where: { id },
        data: {
          members: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error('An error occurred while adding the user to the group');
    }
  }
  // DELETE /group/:id/members/:userId : Remove a user from a group
  async removeUserFromGroup(id: number, userId: number): Promise<void> {
    try {
      await this.prismaService.group.update({
        where: { id },
        data: {
          members: {
            disconnect: { id: userId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error(
        'An error occurred while removing the user from the group',
      );
    }
  }
  // DELETE /group/:id/members : Remove multiple users from a group
  async removeMultipleUsersFromGroup(
    id: number,
    userIds: number[],
  ): Promise<void> {
    try {
      await this.prismaService.group.update({
        where: { id },
        data: {
          members: {
            disconnect: userIds.map((userId) => ({ id: userId })),
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error('Group not found');
      }
      throw new Error(
        'An error occurred while removing multiple users from the group',
      );
    }
  }
}
