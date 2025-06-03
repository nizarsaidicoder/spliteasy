import { IsString, IsOptional, IsNumber, IsDate, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ShareInputDto } from './share-input.dto';

export class UpdateExpenseDto
{
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShareInputDto)
  shares?: ShareInputDto[];
}
