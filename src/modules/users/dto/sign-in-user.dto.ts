import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../../validation/unique.validation';
import { User } from '../../../entities/user.entity';
import { IsExists } from '../../../validation/is-exists.validation';

export class SignInUserDto {
  @IsNotEmpty()
  @IsExists({}, { table: User, key: 'email' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly code: string;
}
