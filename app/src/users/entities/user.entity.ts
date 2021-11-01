import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
/* entities */
import { Todo } from '../../todos/entities/todo.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column({
    unique: true,
    nullable: false,
    length: 255,
  })
  @ApiProperty()
  email!: string;

  @Column({
    nullable: false,
    length: 255,
    transformer: {
      to: (raw: string) => bcrypt.hashSync(raw, 5), // insert時に暗号化して作成
      from: (hashed: string) => hashed, // select時はhashのまま取得
    },
  })
  @ApiProperty()
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  updatedAt!: Date;

  /**
   * relation
   */
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
