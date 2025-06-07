"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signInUsername(data) {
        const user = await this.usersService.findOneByUsername(data.username);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username: data.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signInEmail(data) {
        const user = await this.usersService.findOneByEmail(data.email);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signUp(signupDto) {
        const userByUsername = await this.usersService.findOneByUsername(signupDto.username);
        const userByEmail = await this.usersService.findOneByEmail(signupDto.email);
        if (userByUsername) {
            throw new common_1.UnauthorizedException('User with this username already exists');
        }
        if (userByEmail) {
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        const newUser = await this.usersService.create(signupDto);
        const payload = { username: newUser.username, sub: newUser.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map