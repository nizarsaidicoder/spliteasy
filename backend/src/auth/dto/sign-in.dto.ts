import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInEmailDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class SignInUsernameDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
