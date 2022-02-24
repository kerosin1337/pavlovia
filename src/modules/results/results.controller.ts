import { ResultsService } from './results.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { CreateResultDto } from './dto/create-result.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post('')
  public async createResult(
    @Body(new ValidationPipe()) dto: CreateResultDto,
    @Req() { user },
  ) {
    return await this.resultsService.create(dto, user);
  }
}
