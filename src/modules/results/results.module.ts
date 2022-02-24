import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from '../../entities/result.entity';

@Module({
  imports: [SequelizeModule.forFeature([Result])],
  providers: [ResultsService],
  controllers: [ResultsController],
  exports: [ResultsService],
})
export class ResultsModule {}
