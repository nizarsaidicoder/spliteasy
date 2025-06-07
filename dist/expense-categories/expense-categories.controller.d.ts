import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { ExpenseCategory } from '@prisma/client';
import { ExpenseCategoriesService } from './expense-categories.service';
export declare class ExpenseCategoriesController {
    private readonly expenseCategoriesService;
    constructor(expenseCategoriesService: ExpenseCategoriesService);
    createOne(createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory>;
    getAll(): Promise<ExpenseCategory[]>;
    getById(id: number): Promise<ExpenseCategory | null>;
    updateOne(id: number, updateExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory>;
    deleteOne(id: number): Promise<void>;
    getByName(name: string): Promise<ExpenseCategory | null>;
}
