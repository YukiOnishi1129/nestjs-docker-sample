import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
/* repositories */
import { UserRepository } from '../repositories/user.repository';
/* interfaces */
// import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // passport-localではデフォルトでvalidateに{username, password}が渡ってくるので
    // superでemailを渡すように変更
    super({ usernameField: 'email' });
  }

  async validate(email: string) {
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
