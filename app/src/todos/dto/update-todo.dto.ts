import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    example: 1,
    type: Number,
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
}
