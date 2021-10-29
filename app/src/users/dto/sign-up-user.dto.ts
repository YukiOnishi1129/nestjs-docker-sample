import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({
    example: 'test1@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'hogehoge',
    type: String,
    minLength: 6,
    maxLength: 25,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  password: string;
}
