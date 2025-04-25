import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/users/entity/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInEmailDto, SignInUsernameDto } from './dto/sign-in.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInUsername(data: SignInUsernameDto): Promise<AuthResponseDto> {
    const user: User | null = await this.usersService.findOneByUsername(
      data.username,
    );

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: data.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInEmail(data: SignInEmailDto): Promise<AuthResponseDto> {
    const user: User | null = await this.usersService.findOneByEmail(
      data.email,
    );

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: SignUpDto): Promise<any> {
    const userByUsername = await this.usersService.findOneByUsername(
      signupDto.username,
    );
    const userByEmail = await this.usersService.findOneByEmail(signupDto.email);

    if (userByUsername) {
      throw new UnauthorizedException('User with this username already exists');
    }
    if (userByEmail) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const newUser = await this.usersService.create(signupDto);

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
