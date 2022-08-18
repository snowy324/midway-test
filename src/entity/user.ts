// src/entity/person.ts
import {
  Table,
  Model,
  Column,
  DataType,
  // CreatedAt,
  // UpdatedAt,
  // DeletedAt,
} from 'sequelize-typescript';

@Table({
  freezeTableName: true,
  timestamps: true,
  tableName: 'user',
  underscored: true,
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class User extends Model {
  @Column({
    type: DataType.BIGINT({
      length: 10,
      unsigned: true,
    }),
    primaryKey: true,
    autoIncrement: true,
  })
  id;

  @Column({
    type: DataType.STRING({
      length: 255,
    }),
  })
  name;

  @Column({
    type: DataType.STRING({
      length: 255,
    }),
  })
  address;

  @Column({
    type: DataType.STRING({
      length: 255,
    }),
  })
  description;

  // @CreatedAt
  // createdAt: Date;

  // @UpdatedAt
  // updatedAt: Date;

  // @DeletedAt
  // deleteAt: Date;
}
