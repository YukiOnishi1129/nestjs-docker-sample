import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Todo } from '../entities/todo.entity';

export class TodoUserResponse {
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
  @ApiProperty({
    example: 'test1@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;
}

/**
 * FindTodoResponseDto
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
    example: 1,
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2021-10-28T08:38:14.237Z',
    type: Date,
  })
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({
    example: {
      id: 1,
      email: 'test@gmail.com',
      createdAt: '2021-10-28T08:38:14.237Z',
      updatedAt: '2021-10-28T08:38:14.237Z',
    },
    type: TodoUserResponse,
  })
  @IsNotEmpty()
  user: TodoUserResponse;
}

/**
 * FindTodoListResponseDto
 */
export class FindTodoListResponseDto {
  @ApiProperty({
    type: [FindTodoResponseDto],
    example: [
      {
        id: 1,
        title: 'タスク1',
        userId: 1,
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
        user: {
          id: 1,
          email: 'test@gmail.com',
          createdAt: '2021-10-28T08:38:14.237Z',
          updatedAt: '2021-10-28T08:38:14.237Z',
        },
      },
      {
        id: 2,
        title: 'タスク2',
        userId: 1,
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
        user: {
          id: 1,
          email: 'test@gmail.com',
          createdAt: '2021-10-28T08:38:14.237Z',
          updatedAt: '2021-10-28T08:38:14.237Z',
        },
      },
      {
        id: 3,
        title: 'タスク3',
        userId: 1,
        createdAt: '2021-10-28T08:38:14.237Z',
        updatedAt: '2021-10-28T08:38:14.237Z',
        user: {
          id: 1,
          email: 'test@gmail.com',
          createdAt: '2021-10-28T08:38:14.237Z',
          updatedAt: '2021-10-28T08:38:14.237Z',
        },
      },
    ],
  })
  todos: FindTodoResponseDto[];
}
