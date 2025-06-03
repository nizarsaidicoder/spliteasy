import { IsNumber, IsInt } from 'class-validator';

export class ShareInputDto
{
  @IsInt()
  userId: number;

  @IsNumber()
  amount: number;
}
