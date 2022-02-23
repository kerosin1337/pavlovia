import { User } from '../../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from './passport/passport.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    PassportModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
