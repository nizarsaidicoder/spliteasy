import { ShareInputDto } from './share-input.dto';
export declare class UpdateExpenseDto {
    name?: string;
    description?: string;
    amount?: number;
    date?: Date;
    categoryId?: number;
    shares?: ShareInputDto[];
}
