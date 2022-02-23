import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../../validation/unique.validation';
import { User } from '../../../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsUnique({}, { key: 'email', table: User })
  readonly email: string;

  @IsNotEmpty()
  readonly code: string;
}
