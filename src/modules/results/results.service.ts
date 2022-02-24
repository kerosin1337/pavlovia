import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from '../../entities/result.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result) private resultRepository: typeof Result) {}

  public async create(body, user: User) {
    return await this.resultRepository.create({ ...body, userId: user.id });
  }
}
