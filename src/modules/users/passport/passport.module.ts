import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class PassportModule {}
