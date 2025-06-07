import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from '@prisma/client';
import { UserPayload } from '@app-types/user-payload.type';
import { ConversionMode } from '@app-types/conversion-mode.type';
export declare class ExpensesController {
    private readonly expenseService;
    constructor(expenseService: ExpensesService);
    getOneById(user: UserPayload, id: number): Promise<Expense | null>;
    createOne(user: UserPayload, createExpenseDto: CreateExpenseDto, mode?: ConversionMode): Promise<Expense>;
    getSomeOfGroup(user: UserPayload, groupId: number): Promise<Expense[]>;
    getSomeOfUser(user: UserPayload, userId: number): Promise<Expense[]>;
    updateOne(user: UserPayload, id: number, updateExpenseDto: UpdateExpenseDto, mode?: ConversionMode): Promise<Expense>;
    deleteOne(user: UserPayload, id: number): Promise<void>;
}
