import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
/* dto */
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
/* repositories */
import { UserRepository } from './repositories/user.repository';
/* interfaces */
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class UsersService {
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

  /**
   * ユーザー新規登録
   * @param {SignUpUserDto} signUpUserDto
   */
  async create(signUpUserDto: SignUpUserDto) {
    await this.userRepository.createUser(signUpUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
