import { Injectable } from '@nestjs/common';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaClient: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique({
      where: { username },
    });
    if (!user) {
      return undefined;
    }
    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
    );
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        username: createUserDto.username,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
    );
  }
}
