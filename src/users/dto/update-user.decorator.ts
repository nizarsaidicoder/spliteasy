import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(2)
  firstName?: string;

  @IsString()
  @IsOptional()
  @Length(2)
  lastName?: string;

  @IsString()
  @IsOptional()
  @Length(8)
  password?: string;

  @IsString()
  @IsOptional()
  @Length(2)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
