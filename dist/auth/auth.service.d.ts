import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { SignInEmailDto, SignInUsernameDto } from './dto/sign-in.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signInUsername(data: SignInUsernameDto): Promise<AuthResponseDto>;
    signInEmail(data: SignInEmailDto): Promise<AuthResponseDto>;
    signUp(signupDto: SignUpDto): Promise<any>;
}
