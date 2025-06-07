"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const group_entity_1 = require("./entity/group.entity");
const client_1 = require("@prisma/client");
const users_service_1 = require("../users/users.service");
let GroupsService = class GroupsService {
    prismaService;
    userService;
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
    }
    async isMember(userId, groupId) {
        const group = await this.prismaService.group.findUnique({
            where: { id: groupId },
            include: {
                members: {
                    select: { id: true },
                },
            },
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${groupId} not found`);
        }
        return group.members.some((member) => member.id === userId);
    }
    async assertIsGroupMember(userId, groupId) {
        const isMember = await this.isMember(userId, groupId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of this group');
        }
    }
    async getById(userId, id) {
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
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        const isMember = group.members.some((member) => member.id === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of this group');
        }
        const memberIds = group.members.map((member) => member.id);
        const expenseIds = group.expenses.map((expense) => expense.id);
        return new group_entity_1.Group(group.id, group.name, memberIds, expenseIds);
    }
    async create(creatorId, createGroupDto) {
        try {
            const group = await this.prismaService.group.create({
                data: {
                    name: createGroupDto.name,
                    members: {
                        connect: { id: creatorId },
                    },
                },
            });
            return new group_entity_1.Group(group.id, group.name, [creatorId], []);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Creator user not found');
                }
            }
            throw new common_1.InternalServerErrorException('Could not create group');
        }
    }
    async update(currentMember, id, updateGroupDto) {
        await this.assertIsGroupMember(currentMember, id);
        const data = {
            name: updateGroupDto.name,
        };
        if (updateGroupDto.members) {
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
        return new group_entity_1.Group(updatedGroup.id, updatedGroup.name, updatedGroup.members.map((member) => member.id), updatedGroup.expenses.map((expense) => expense.id));
    }
    async addUser(currentMember, id, userId) {
        await this.assertIsGroupMember(currentMember, id);
        if (userId === currentMember) {
            throw new common_1.ForbiddenException('You cannot add yourself to the group');
        }
        await this.userService.getOne(userId).catch(() => {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        });
        await this.isMember(userId, id).catch(() => {
            throw new common_1.ForbiddenException('User is already a member of this group');
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
    async addUsers(currentMember, id, memberIds) {
        await this.assertIsGroupMember(currentMember, id);
        const users = await this.userService.getMany(memberIds);
        const existingUserIds = users.map((user) => user.id);
        const validMemberIds = memberIds.filter((id) => existingUserIds.includes(id));
        if (memberIds.length === 0) {
            throw new common_1.NotFoundException('No valid users to add to the group');
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
    async removeUser(currentMember, id, userId) {
        await this.assertIsGroupMember(currentMember, id);
        if (userId === currentMember) {
            throw new common_1.ForbiddenException("You can't remove yourself from the group");
        }
        const isUserMember = await this.isMember(userId, id);
        if (!isUserMember) {
            throw new common_1.NotFoundException(`User with ID ${userId} is not a member of this group`);
        }
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
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map