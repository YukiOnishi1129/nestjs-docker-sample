import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
/* repositories */
import { UserRepository } from '../repositories/user.repository';
/* interfaces */
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`, // JWTトークンは文字列にしないとエラー
    });
  }

  async validate({ email }: JwtPayload) {
    const user = await this.userRepository.findOne({
      relations: ['todos'],
      where: [{ email }],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
