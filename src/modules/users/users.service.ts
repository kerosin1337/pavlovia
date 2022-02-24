import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { FindOptions } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  public async createUser(dto) {
    const user = await this.userRepository.create(dto);

    return {
      user,
      accessToken: this.generateToken(
        { email: user.email, code: user.code },
        'supersecret',
        null,
      ),
    };
  }

  public async signIn(dto) {
    const user = await this.userRepository.findOne({ where: dto });

    return {
      user,
      accessToken: this.generateToken(
        { email: user.email, code: user.code },
        'supersecret',
        null,
      ),
    };
  }

  public async getUser(option: FindOptions<User['_attributes']>) {
    return await this.userRepository.findOne(option);
  }

  private generateToken(
    payload: any,
    secret: string,
    expires: string | number | null = null,
  ): string {
    const options: { [key: string]: any } = { secret };
    if (expires != null) options.expiresIn = expires;
    return this.jwtService.sign(payload, options);
  }
}
