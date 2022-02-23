import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface UserCreationInterface {
  email: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User, UserCreationInterface> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4 })
  id: string;

  @Column
  email: string;

  @Column
  code: string;

  @Column
  isActive: string;
}
