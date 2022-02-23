import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private messageFormatter(errors: ValidationError[]) {
    const obj = {};

    for (const error of errors) {
      obj[error.property] = Object.values(error.constraints);
    }
    return obj;
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      throw new HttpException(this.messageFormatter(errors), 422);
    }

    return value;
  }
}
