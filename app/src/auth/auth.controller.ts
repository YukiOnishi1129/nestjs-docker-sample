import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  UseGuards,
  //   Request,
} from '@nestjs/common';
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
import { AuthService } from './auth.service';
/* dto */
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
/* entities */
// import { User } from '../users/entities/user.entity';
/* guard */
import { LocalAuthGuard } from '../common/guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_up')
  @HttpCode(200)
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
    return await this.authService.signUp(signUpUserDto);
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
    // @Request() req: { user: User },
  ) {
    return await this.authService.signIn(signInUserDto);
  }
}
