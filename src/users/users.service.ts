import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaClient: PrismaService) {}

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { username },
    });
    if (!user) {
      return null;
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

  async findOneById(id: number): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
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

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
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
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.prismaClient.user.create({
      data: {
        username: createUserDto.username,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
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

  async delete(id: number): Promise<void> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.prismaClient.user.delete({
      where: { id },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
