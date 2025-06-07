import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserPayload } from '@app-types/user-payload.type';
import { AddUsersDto } from './dto/add-users.dto';
export declare class GroupsController {
    private groupService;
    constructor(groupService: GroupsService);
    create(user: UserPayload, createGroupDto: CreateGroupDto): Promise<import("./entity/group.entity").Group>;
    getGroupById(user: UserPayload, id: string): Promise<import("./entity/group.entity").Group | null>;
    update(user: UserPayload, id: string, updateGroupDto: UpdateGroupDto): Promise<import("./entity/group.entity").Group>;
    addMultipleMembers(user: UserPayload, id: string, payload: AddUsersDto): Promise<{
        message: string;
    }>;
    addSingleMember(user: UserPayload, id: string, userId: string): Promise<{
        message: string;
    }>;
    removeSingleMember(user: UserPayload, id: string, userId: string): Promise<{
        message: string;
    }>;
    removeMe(user: UserPayload, id: string): Promise<{
        message: string;
    }>;
}
