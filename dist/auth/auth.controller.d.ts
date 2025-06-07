import { AuthService } from './auth.service';
import { SignInEmailDto, SignInUsernameDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signInEmail(signInDto: SignInEmailDto): Promise<import("./dto/auth-response.dto").AuthResponseDto>;
    signInUsername(signInDto: SignInUsernameDto): Promise<import("./dto/auth-response.dto").AuthResponseDto>;
    signUp(signUpDto: SignUpDto): Promise<any>;
}
