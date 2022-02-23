import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends BaseAuthGuard(['jwt']) {
  constructor() {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new HttpException({ message: 'You need authorization' }, 401);
    }
    return user;
  }
}
