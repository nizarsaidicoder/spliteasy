import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { UserPayload } from '@app-types/user-payload.type';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: UserPayload): Promise<GetUserResponseDto | null>;
    getOne(id: string): Promise<GetUserResponseDto | null>;
    delete(user: UserPayload): Promise<void>;
    update(updateUserDto: UpdateUserDto, user: UserPayload): Promise<User>;
}
