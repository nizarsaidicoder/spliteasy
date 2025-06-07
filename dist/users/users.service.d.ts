import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prismaClient;
    constructor(prismaClient: PrismaService);
    findOneByUsername(username: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    getOne(id: number): Promise<Omit<User, 'password'> | null>;
    getMany(ids: number[]): Promise<Omit<User, 'password'>[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<void>;
    private hashPassword;
}
