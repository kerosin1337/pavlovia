import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post('')
  public async create(
    @Body(new ValidationPipe()) body: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createUser(body);
  }
}
