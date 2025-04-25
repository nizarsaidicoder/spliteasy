import {
  Controller,
  Delete,
  Get,
  HttpCode,
  UseGuards,
  Param,
} from '@nestjs/common';
import { User } from './entity/user';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { UserGuard } from './user.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserPayload } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(200)
  getOne(@Param('id') id: User['id']): Promise<GetUserResponseDto | null> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(UserGuard)
  @HttpCode(204)
  @Delete('me')
  delete(@CurrentUser() user: UserPayload): Promise<void> {
    return this.usersService.delete(user.sub);
  }
}
