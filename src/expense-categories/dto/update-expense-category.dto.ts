import { IsOptional, IsString } from 'class-validator';

export class UpdateExpenseCategoryDto
{
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  icon: string;
}
