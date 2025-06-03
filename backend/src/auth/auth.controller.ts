import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInEmailDto, SignInUsernameDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('email/signin')
  signInEmail(@Body() signInDto: SignInEmailDto) {
    return this.authService.signInEmail(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('username/signin')
  signInUsername(@Body() signInDto: SignInUsernameDto) {
    return this.authService.signInUsername(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
