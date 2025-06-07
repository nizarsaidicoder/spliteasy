import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UsersService } from 'src/users/users.service';
export declare class GroupsService {
    private prismaService;
    private userService;
    constructor(prismaService: PrismaService, userService: UsersService);
    isMember(userId: number, groupId: number): Promise<boolean>;
    private assertIsGroupMember;
    getById(userId: number, id: number): Promise<Group | null>;
    create(creatorId: number, createGroupDto: CreateGroupDto): Promise<Group>;
    update(currentMember: number, id: number, updateGroupDto: UpdateGroupDto): Promise<Group>;
    addUser(currentMember: number, id: number, userId: number): Promise<{
        message: string;
    }>;
    addUsers(currentMember: number, id: number, memberIds: number[]): Promise<{
        message: string;
    }>;
    removeUser(currentMember: number, id: number, userId: number): Promise<{
        message: string;
    }>;
}
