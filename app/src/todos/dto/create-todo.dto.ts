import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
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

export class CreateTodoResponseDto {
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
