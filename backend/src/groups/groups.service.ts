import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GroupsService
{
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  )
  {}

  async isMember(userId: number, groupId: number): Promise<boolean>
  {
    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          select: { id: true },
        },
      },
    });

    if (!group)
    {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return group.members.some((member) => member.id === userId);
  }
  private async assertIsGroupMember(userId: number, groupId: number): Promise<void>
  {
    const isMember = await this.isMember(userId, groupId);
    if (!isMember)
    {
      throw new ForbiddenException('You are not a member of this group');
    }
  }
  // GET /group/:id : Get group by id
  async getById(userId: number, id: number): Promise<Group | null>
  {
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

    if (!group)
    {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    const isMember = group.members.some((member) => member.id === userId);
    if (!isMember)
    {
      throw new ForbiddenException('You are not a member of this group');
    }

    const memberIds = group.members.map((member) => member.id);
    const expenseIds = group.expenses.map((expense) => expense.id);

    return new Group(group.id, group.name, memberIds, expenseIds);
  }

  // POST /group : Create group
  async create(creatorId: number, createGroupDto: CreateGroupDto): Promise<Group>
  {
    try
    {
      const group = await this.prismaService.group.create({
        data: {
          name: createGroupDto.name,
          members: {
            connect: { id: creatorId },
          },
        },
      });
      return new Group(group.id, group.name, [creatorId], []);
    }
    catch (error)
    {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
      {
        if (error.code === 'P2025')
        {
          throw new NotFoundException('Creator user not found');
        }
      }
      throw new InternalServerErrorException('Could not create group');
    }
  }
  // PATCH /group/:id : Update group
  async update(currentMember: number, id: number, updateGroupDto: UpdateGroupDto): Promise<Group>
  {
    await this.assertIsGroupMember(currentMember, id);

    const data: Prisma.GroupUpdateInput = {
      name: updateGroupDto.name,
    };

    if (updateGroupDto.members)
    {
      data.members = {
        set: updateGroupDto.members.map((memberId) => ({ id: memberId })),
      };
    }

    const updatedGroup = await this.prismaService.group.update({
      where: { id },
      data,
      include: {
        members: {
          select: { id: true },
        },
        expenses: {
          select: { id: true },
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
  async addUser(currentMember: number, id: number, userId: number)
  {
    await this.assertIsGroupMember(currentMember, id);

    if (userId === currentMember)
    {
      throw new ForbiddenException('You cannot add yourself to the group');
    }

    await this.userService.getOne(userId).catch(() =>
    {
      throw new NotFoundException(`User with ID ${userId} not found`);
    });

    await this.isMember(userId, id).catch(() =>
    {
      throw new ForbiddenException('User is already a member of this group');
    });

    await this.prismaService.group.update({
      where: { id },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
    return {
      message: `User ${userId} added to the group successfully`,
    };
  }
  // POST /group/:id/members : Add multiple users to a group
  async addUsers(currentMember: number, id: number, memberIds: number[])
  {
    await this.assertIsGroupMember(currentMember, id);

    const users = await this.userService.getMany(memberIds);
    const existingUserIds = users.map((user) => user.id);
    const validMemberIds = memberIds.filter((id) => existingUserIds.includes(id));

    if (memberIds.length === 0)
    {
      throw new NotFoundException('No valid users to add to the group');
    }

    await this.prismaService.group.update({
      where: { id },
      data: {
        members: {
          connect: validMemberIds.map((memberId) => ({ id: memberId })),
        },
      },
    });
    return {
      message: `Users added to the group successfully`,
    };
  }
  // DELETE /group/:id/members/:userId : Remove a user from a group
  async removeUser(currentMember: number, id: number, userId: number)
  {
    await this.assertIsGroupMember(currentMember, id);

    if (userId === currentMember)
    {
      throw new ForbiddenException("You can't remove yourself from the group");
    }

    const isUserMember = await this.isMember(userId, id);
    if (!isUserMember)
    {
      throw new NotFoundException(`User with ID ${userId} is not a member of this group`);
    }
    // NOTE : For the moment, we don't implement a check if the user still has expenses in the group

    await this.prismaService.group.update({
      where: { id },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });

    return {
      message: `User ${userId} removed from the group successfully`,
    };
  }

  async generateToken(groupId: number): Promise<string>
  {
    const payload = { groupId };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async getInviteLink(userId: number, groupId: number): Promise<string>
  {
    await this.assertIsGroupMember(userId, groupId);
    const group = await this.prismaService.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          select: { id: true },
        },
      },
    });

    if (!group)
    {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const token = await this.generateToken(groupId);
    const inviteLink = `localhost:3000/groups/join/${token}`;
    return inviteLink;
  }

  async joinGroup(userId: number, token: string)
  {
    try
    {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const isMember = await this.isMember(userId, payload.groupId);
      if (isMember)
      {
        console.log(`User ${userId} is already a member of group ${payload.groupId}`);
        throw new ForbiddenException('You are already a member of this group');
      }

      const groupId = payload.groupId;
      await this.prismaService.group.update({
        where: { id: groupId },
        data: {
          members: {
            connect: { id: userId },
          },
        },
      });
      return {
        message: `You have successfully joined the group with ID ${groupId}`,
      };
    }
    catch (e)
    {
      if (e instanceof ForbiddenException)
      {
        throw e;
      }
      throw new UnauthorizedException('Invalid or expired invitation link');
    }
  }
}
