import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: `${process.env.JWT_SECRET}`,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    console.log('111');
    console.log(payload);
    return { userId: payload.userId, email: payload.email };
  }
}
