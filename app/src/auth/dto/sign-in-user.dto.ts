import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    example: 'test1@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    type: String,
    minLength: 6,
    maxLength: 25,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
