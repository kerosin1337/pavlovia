import { ResultJsonDto } from './result-json.dto';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IsExists } from '../../../validation/is-exists.validation';
import { User } from '../../../entities/user.entity';

export class CreateResultDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ResultJsonDto)
  readonly field: ResultJsonDto[];
}
