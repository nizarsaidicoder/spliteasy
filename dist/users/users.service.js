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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entity/user.entity");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const client_1 = require(".prisma/client");
let UsersService = class UsersService {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async findOneByUsername(username) {
        const user = await this.prismaClient.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive',
                },
            },
        });
        if (!user) {
            return null;
        }
        return new user_entity_1.User(user.id, user.username, user.firstName, user.lastName, user.email, user.password);
    }
    async findOneById(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id },
        });
        if (!user) {
            return null;
        }
        return new user_entity_1.User(user.id, user.username, user.firstName, user.lastName, user.email, user.password);
    }
    async findOneByEmail(email) {
        const user = await this.prismaClient.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            },
        });
        if (!user) {
            return null;
        }
        return new user_entity_1.User(user.id, user.username, user.firstName, user.lastName, user.email, user.password);
    }
    async getOne(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
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
    async getMany(ids) {
        const users = await this.prismaClient.user.findMany({
            where: { id: { in: ids } },
        });
        return users.map((user) => ({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    }
    async create(createUserDto) {
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
        return new user_entity_1.User(user.id, user.username, user.firstName, user.lastName, user.email, user.password);
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            const updatedUser = await this.prismaClient.user.update({
                where: { id },
                data: {
                    ...updateUserDto,
                    password: updateUserDto.password ? await this.hashPassword(updateUserDto.password) : undefined,
                },
            });
            return new user_entity_1.User(updatedUser.id, updatedUser.username, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.password);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.NotFoundException(`User with this username or email already exists`);
                }
            }
            throw error;
        }
    }
    async delete(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        await this.prismaClient.user.delete({
            where: { id },
        });
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map