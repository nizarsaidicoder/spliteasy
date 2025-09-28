import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto
{
  @IsString()
  @IsOptional()
  @MinLength(2)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
