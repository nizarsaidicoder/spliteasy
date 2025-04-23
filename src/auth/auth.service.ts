import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/users/entity/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user: User | undefined = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // FIXME : This is a temporary solution, USE BCRYPT
    console.log(user.password);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne(signupDto.username);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = await this.usersService.create(signupDto);
    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
