import { IsString, IsArray, IsInt, MinLength } from 'class-validator';

export class UpdateGroupDto
{
  @IsString()
  @MinLength(2)
  name?: string;

  @IsArray()
  @IsInt({ each: true })
  members?: number[];
}
