import {
  IsString,
  IsArray,
  IsInt,
  MinLength,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  members: number[];
}
