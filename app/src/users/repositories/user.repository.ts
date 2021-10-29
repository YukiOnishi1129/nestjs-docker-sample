import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
/* entities */
import { User } from '../entities/user.entity';
/* dto */
import { SignUpUserDto } from '../dto/sign-up-user.dto';

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
}
