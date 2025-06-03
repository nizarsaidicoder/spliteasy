import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AddUsersDto
{
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  members: number[];
}
