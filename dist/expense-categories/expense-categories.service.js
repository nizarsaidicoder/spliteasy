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
exports.ExpenseCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExpenseCategoriesService = class ExpenseCategoriesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createOne(createExpenseCategoryDto) {
        return await this.prismaService.expenseCategory.create({
            data: {
                name: createExpenseCategoryDto.name,
                icon: createExpenseCategoryDto.icon,
            },
        });
    }
    async getAll() {
        return await this.prismaService.expenseCategory.findMany();
    }
    async getById(id) {
        const category = await this.prismaService.expenseCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`ExpenseCategory with ID ${id} not found`);
        }
        return category;
    }
    async updateOne(id, updateExpenseCategoryDto) {
        const existingCategory = await this.prismaService.expenseCategory.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new common_1.NotFoundException(`ExpenseCategory with ID ${id} not found`);
        }
        const category = await this.prismaService.expenseCategory.update({
            where: { id },
            data: {
                name: updateExpenseCategoryDto.name,
                icon: updateExpenseCategoryDto.icon,
            },
        });
        return category;
    }
    async deleteOne(id) {
        const existingCategory = await this.prismaService.expenseCategory.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new common_1.NotFoundException(`ExpenseCategory with ID ${id} not found`);
        }
        await this.prismaService.expenseCategory.delete({
            where: { id },
        });
    }
    async getByName(name) {
        return await this.prismaService.expenseCategory.findFirst({
            where: { name },
        });
    }
};
exports.ExpenseCategoriesService = ExpenseCategoriesService;
exports.ExpenseCategoriesService = ExpenseCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseCategoriesService);
//# sourceMappingURL=expense-categories.service.js.map