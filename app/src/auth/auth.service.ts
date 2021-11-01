import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
/* dto */
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
/* repositories */
import { UserRepository } from '../users/repositories/user.repository';
/* interfaces */
import { JwtPayload } from '../common/jwt/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtSecret: JwtService,
  ) {}

  /**
   * ログイン
   * @param {SignInUserDto} signInUserDto
   * @returns
   */
  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userRepository.validatePassword(signInUserDto);

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };
    // jwtアクセストークンを作成し返却
    return {
      accessToken: this.jwtSecret.sign(payload),
    };
  }

  /**
   * ユーザー新規登録
   * @param {SignUpUserDto} signUpUserDto
   * @returns
   */
  async signUp(signUpUserDto: SignUpUserDto) {
    const user = await this.userRepository.createUser(signUpUserDto);

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };
    // jwtアクセストークンを作成し返却
    return {
      accessToken: this.jwtSecret.sign(payload),
    };
  }
}
