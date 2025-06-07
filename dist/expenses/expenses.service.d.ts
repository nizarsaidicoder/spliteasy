import { PrismaService } from '@prisma/prisma.service';
import { GroupsService } from '@src/groups/groups.service';
import { Expense } from '@prisma/client';
import { ConversionMode } from '@app-types/conversion-mode.type';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseCategoriesService } from '@src/expense-categories/expense-categories.service';
export declare class ExpensesService {
    private prismaService;
    private groupsService;
    private expenseCategoriesService;
    constructor(prismaService: PrismaService, groupsService: GroupsService, expenseCategoriesService: ExpenseCategoriesService);
    createOne(userId: number, createExpenseDto: CreateExpenseDto, mode: ConversionMode): Promise<{
        group: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        shares: {
            id: number;
            amount: number;
            userId: number;
            expenseId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        amount: number;
        categoryId: number | null;
        date: Date;
        groupId: number;
        userId: number;
    }>;
    getOneById(userId: number, id: number): Promise<Expense | null>;
    getSomeOfGroup(userId: number, groupId: number): Promise<({
        shares: {
            id: number;
            amount: number;
            userId: number;
            expenseId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        amount: number;
        categoryId: number | null;
        date: Date;
        groupId: number;
        userId: number;
    })[]>;
    getSomeOfUser(userId: number): Promise<Expense[]>;
    updateOne(userId: number, id: number, updateExpenseDto: UpdateExpenseDto, mode?: ConversionMode): Promise<{
        shares: {
            id: number;
            amount: number;
            userId: number;
            expenseId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        amount: number;
        categoryId: number | null;
        date: Date;
        groupId: number;
        userId: number;
    }>;
    deleteOne(userId: number, id: number): Promise<void>;
    private calculateShares;
}
