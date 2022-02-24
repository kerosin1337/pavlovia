import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { ResultJsonDto } from '../modules/results/dto/result-json.dto';

interface ResultCreationInterface {
  userId: string;
  field: string;
}

@Table({ tableName: 'results', timestamps: false })
export class Result extends Model<Result, ResultCreationInterface> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.JSONB })
  field: ResultJsonDto[];

  @Column
  @ForeignKey(() => User)
  userId: string;
}
