import { IsString, IsOptional, IsNumber, IsDate, IsInt, ValidateNested, ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ShareInputDto } from './share-input.dto';

export class CreateExpenseDto
{
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsInt()
  groupId: number;

  @IsInt()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ShareInputDto)
  shares: ShareInputDto[];
}
