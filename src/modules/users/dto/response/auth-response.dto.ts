import { User } from '../../../../entities/user.entity';

export class AuthResponseDto {
  accessToken: string;
  user: User;
}
