import {
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
/* entities */
import { User } from '../entities/user.entity';
/* dto */
import { SignUpUserDto } from '../dto/sign-up-user.dto';
import { SignInUserDto } from '../../auth/dto/sign-in-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 新規登録
   * @param {SignUpUserDto}
   */
  async createUser({ email, password }: SignUpUserDto) {
    const user = new User();
    user.email = email;
    user.password = password;

    try {
      await user.save();
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('メールアドレスが登録済みです');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * パスワード照合
   * @param {SignInUserDto}
   * @returns
   */
  async validatePassword({ email, password }: SignInUserDto) {
    const user = await this.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('メールアドレスまたはパスワードが違います');
  }
}
