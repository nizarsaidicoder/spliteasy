import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.decorator';
import { Prisma } from '.prisma/client';

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

  async getOne(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      const updatedUser = await this.prismaClient.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: updateUserDto.password
            ? await this.hashPassword(updateUserDto.password)
            : undefined,
        },
      });

      return new User(
        updatedUser.id,
        updatedUser.username,
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.email,
        updatedUser.password,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NotFoundException(
            `User with this username or email already exists`,
          );
        }
      }
      throw error;
    }
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
