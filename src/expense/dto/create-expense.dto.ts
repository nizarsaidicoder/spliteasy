import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsInt,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class ShareDto
{
  @IsInt()
  userId: number;

  @IsNumber()
  amount: number;
}

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

  @IsInt()
  groupId: number;

  @IsInt()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ShareDto)
  shares: ShareDto[];
}
