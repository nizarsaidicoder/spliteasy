import { ShareInputDto } from './share-input.dto';
export declare class CreateExpenseDto {
    name: string;
    description?: string;
    amount: number;
    date: Date;
    categoryId?: number;
    groupId: number;
    userId: number;
    shares: ShareInputDto[];
}
