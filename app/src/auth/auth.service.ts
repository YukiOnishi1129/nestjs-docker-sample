import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
/* dto */
import { SignUpUserDto } from '../users/dto/sign-up-user.dto';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';
/* repositories */
import { UserRepository } from '../users/repositories/user.repository';
/* interfaces */
import { JwtPayload } from '../users/interface/jwt-payload.interface';

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
    // return await this.jwtSecret.signAsync(payload);
    return this.jwtSecret.sign(payload);
  }
}
