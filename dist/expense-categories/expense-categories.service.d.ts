import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { PrismaService } from '@prisma/prisma.service';
import { ExpenseCategory } from '@prisma/client';
export declare class ExpenseCategoriesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createOne(createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>;
    getAll(): Promise<ExpenseCategory[]>;
    getById(id: number): Promise<ExpenseCategory | null>;
    updateOne(id: number, updateExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any>;
    deleteOne(id: number): Promise<void>;
    getByName(name: string): Promise<any>;
}
