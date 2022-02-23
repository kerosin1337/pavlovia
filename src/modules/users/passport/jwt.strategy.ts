import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecret',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.getUser({
      where: { email: payload.email },
    });
    if (!user)
      throw new HttpException({ message: 'You need authorization' }, 401);
    return user;
  }
}
