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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const groups_service_1 = require("../groups/groups.service");
const expense_categories_service_1 = require("../expense-categories/expense-categories.service");
let ExpensesService = class ExpensesService {
    prismaService;
    groupsService;
    expenseCategoriesService;
    constructor(prismaService, groupsService, expenseCategoriesService) {
        this.prismaService = prismaService;
        this.groupsService = groupsService;
        this.expenseCategoriesService = expenseCategoriesService;
    }
    async createOne(userId, createExpenseDto, mode) {
        const group = await this.groupsService.getById(userId, createExpenseDto.groupId);
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${createExpenseDto.groupId} not found`);
        }
        await this.groupsService.isMember(userId, createExpenseDto.groupId);
        const shares = this.calculateShares(createExpenseDto.amount, createExpenseDto.shares, mode);
        if (createExpenseDto.shares.some((share) => !share.userId || !share.amount)) {
            throw new common_1.ForbiddenException('Each share must have a userId and an amount');
        }
        if (createExpenseDto.shares.length > group.members.length) {
            throw new common_1.ForbiddenException('The number of shares cannot exceed the number of group members');
        }
        if (createExpenseDto.shares.some((share) => share.amount <= 0)) {
            throw new common_1.ForbiddenException('Share amounts must be greater than zero');
        }
        if (createExpenseDto.shares.some((share) => !group.members.some((member) => member === share.userId))) {
            throw new common_1.ForbiddenException('All shares must belong to members of the group');
        }
        const totalShareAmount = shares.reduce((acc, share) => acc + share.amount, 0);
        if (totalShareAmount !== createExpenseDto.amount) {
            throw new common_1.ForbiddenException('The total amount of shares must equal the expense amount');
        }
        let category = null;
        if (createExpenseDto.categoryId) {
            category = await this.expenseCategoriesService.getById(createExpenseDto.categoryId);
        }
        const expense = await this.prismaService.expense.create({
            data: {
                name: createExpenseDto.name,
                description: createExpenseDto.description,
                amount: createExpenseDto.amount,
                groupId: createExpenseDto.groupId,
                userId: createExpenseDto.userId,
                date: createExpenseDto.date,
                categoryId: category ? category.id : undefined,
                shares: {
                    create: shares.map((share) => ({
                        userId: share.userId,
                        amount: share.amount,
                    })),
                },
            },
            include: {
                group: true,
                shares: true,
            },
        });
        return expense;
    }
    async getOneById(userId, id) {
        const expense = await this.prismaService.expense.findUnique({
            where: { id },
            include: { group: { include: { members: true } } },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        const isMember = expense.group.members.some((member) => member.id === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of the group associated with this expense');
        }
        return expense;
    }
    async getSomeOfGroup(userId, groupId) {
        const group = await this.groupsService.getById(userId, groupId);
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${groupId} not found`);
        }
        await this.groupsService.isMember(userId, groupId);
        const expenses = await this.prismaService.expense.findMany({
            where: { groupId },
            include: { shares: true },
        });
        return expenses;
    }
    async getSomeOfUser(userId) {
        const shares = await this.prismaService.share.findMany({
            where: { userId },
            include: { expense: true },
        });
        const expenses = await this.prismaService.expense.findMany({
            where: { id: { in: shares.map((share) => share.expenseId) } },
            include: { shares: true, group: true },
        });
        if (!expenses || expenses.length === 0) {
            return [];
        }
        return expenses;
    }
    async updateOne(userId, id, updateExpenseDto, mode = 'amount') {
        const expense = await this.prismaService.expense.findUnique({
            where: { id },
            include: { group: { include: { members: true } } },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        const isMember = expense.group.members.some((member) => member.id === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of the group associated with this expense');
        }
        let shares = [];
        if (updateExpenseDto.shares && updateExpenseDto.shares?.length !== 0) {
            if (updateExpenseDto.shares.some((share) => !share.userId || !share.amount)) {
                throw new common_1.ForbiddenException('Each share must have a userId and an amount');
            }
            if (updateExpenseDto.shares.length > expense.group.members.length) {
                throw new common_1.ForbiddenException('The number of shares cannot exceed the number of group members');
            }
            if (updateExpenseDto.shares.some((share) => share.amount <= 0)) {
                throw new common_1.ForbiddenException('Share amounts must be greater than zero');
            }
            if (updateExpenseDto.shares.some((share) => !expense.group.members.some((member) => member.id === share.userId))) {
                throw new common_1.ForbiddenException('All shares must belong to members of the group');
            }
            shares = this.calculateShares(expense.amount, updateExpenseDto.shares, mode);
            const totalShareAmount = shares.reduce((acc, share) => acc + share.amount, 0);
            if (totalShareAmount !== updateExpenseDto.amount) {
                throw new common_1.ForbiddenException('The total amount of shares must equal the expense amount');
            }
        }
        const updatePayload = {
            name: updateExpenseDto.name,
            description: updateExpenseDto.description,
            amount: updateExpenseDto.amount,
        };
        if (shares.length !== 0) {
            updatePayload.shares = {
                deleteMany: {},
                create: shares.map((share) => ({
                    userId: share.userId,
                    amount: share.amount,
                })),
            };
        }
        if (updateExpenseDto.date) {
            updatePayload.date = updateExpenseDto.date;
        }
        if (updateExpenseDto.categoryId) {
            const category = await this.expenseCategoriesService.getById(updateExpenseDto.categoryId);
            if (!category) {
                throw new common_1.NotFoundException(`ExpenseCategory with ID ${updateExpenseDto.categoryId} not found`);
            }
            updatePayload.category = {
                connect: { id: updateExpenseDto.categoryId },
            };
        }
        const updatedExpense = await this.prismaService.expense.update({
            where: { id },
            data: updatePayload,
            include: { shares: true },
        });
        return updatedExpense;
    }
    async deleteOne(userId, id) {
        const expense = await this.prismaService.expense.findUnique({
            where: { id },
            include: { group: { include: { members: true } } },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        if (userId !== expense.userId) {
            throw new common_1.ForbiddenException('You are not the owner of this expense');
        }
        await this.prismaService.expense.delete({
            where: { id },
        });
    }
    calculateShares(amount, shares, mode) {
        switch (mode) {
            case 'part':
                {
                    const totalParts = shares.reduce((acc, share) => acc + share.amount, 0);
                    return shares.map((share) => ({
                        userId: share.userId,
                        amount: (share.amount / totalParts) * amount,
                    }));
                }
            case 'percentage':
                {
                    return shares.map((share) => ({
                        userId: share.userId,
                        amount: (share.amount / 100) * amount,
                    }));
                }
            case 'amount':
                {
                    return shares.map((share) => ({
                        userId: share.userId,
                        amount: share.amount,
                    }));
                }
            default:
                return shares;
        }
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        groups_service_1.GroupsService,
        expense_categories_service_1.ExpenseCategoriesService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map