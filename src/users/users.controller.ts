import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { User } from './entity/user';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserPayload } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(200)
  getMe(@CurrentUser() user: UserPayload): Promise<GetUserResponseDto | null> {
    return this.usersService.getOne(Number(user.sub));
  }

  @Get(':id')
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(200)
  getOne(@Param('id') id: string): Promise<GetUserResponseDto | null> {
    return this.usersService.getOne(Number(id));
  }

  @HttpCode(204)
  @Delete('me')
  delete(@CurrentUser() user: UserPayload): Promise<void> {
    return this.usersService.delete(user.sub);
  }

  @Patch('me')
  @HttpCode(204)
  update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: UserPayload,
  ): Promise<User> {
    return this.usersService.update(user.sub, updateUserDto);
  }
}
