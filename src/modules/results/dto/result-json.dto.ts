import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ResultJsonDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsBoolean()
  error: boolean;
}
