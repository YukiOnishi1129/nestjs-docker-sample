import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
/* services */
import { UsersService } from './users.service';
/* dto */
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
/* entities */
import { User } from './entities/user.entity';
/* guard */
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign_up')
  @ApiCreatedResponse({
    description: 'ユーザー登録完了',
  })
  @ApiBadRequestResponse({
    description: '入力値のフォーマットエラー',
  })
  @ApiConflictResponse({
    description: 'メールアドレスの重複エラー',
  })
  @ApiInternalServerErrorResponse({
    description: 'DBサーバ接続エラー',
  })
  async signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto) {
    await this.usersService.create(signUpUserDto);
  }

  // controllerの処理の前にlocal.strategy.tsのvalidateの処理を実行する
  // UseGuards(LocalAuthGuard)でlocal.strategyに処理を渡すようになる
  @UseGuards(LocalAuthGuard)
  @Post('sign_in')
  @HttpCode(200)
  @ApiOkResponse({
    type: String,
    description: 'ユーザーログイン完了',
  })
  @ApiUnauthorizedResponse({
    description:
      'メールアドレスまたはパスワードが異なることによるログインエラー',
  })
  async signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
    @Request() req: { user: User },
  ) {
    console.log('aaa');
    console.log(req.user);
    return this.usersService.signIn(signInUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
