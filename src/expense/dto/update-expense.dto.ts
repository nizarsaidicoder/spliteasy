import { IsString, IsOptional, IsNumber, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class ShareDto
{
  @IsInt()
  userId: number;

  @IsNumber()
  amount: number;
}

export class UpdateExpenseDto
{
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  shares: ShareDto[];
}
