import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '../../guard/auth.guard';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(201)
  @Post('sign-up')
  public async create(
    @Body(new ValidationPipe()) body: CreateUserDto,
  ): Promise<any> {
    return await this.usersService.createUser(body);
  }

  @HttpCode(200)
  @Post('sign-in')
  public async signIn(
    @Body(new ValidationPipe()) body: SignInUserDto,
  ): Promise<any> {
    return await this.usersService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('current')
  public async getUser(@Req() { user }): Promise<any> {
    return user;
  }
}
