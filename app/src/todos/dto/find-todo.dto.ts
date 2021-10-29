import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';

/**
 * GetTodoResponse
 */
export class FindTodoResponseDto {
  @ApiProperty({
    example: 1,
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'サンプル',
    type: String,
    minLength: 2,
    maxLength: 25,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  title: string;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;
}

/**
 * GetTodoListResponse
 */
export class FindTodoListResponseDto {
  @ApiProperty({
    type: [Todo],
    example: [
      {
        id: 1,
        title: 'タスク1',
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
      },
      {
        id: 2,
        title: 'タスク2',
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
      },
      {
        id: 3,
        title: 'タスク3',
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
      },
    ],
  })
  todos: Todo[];
}
