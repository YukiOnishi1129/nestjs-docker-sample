import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
/* services */
import { UsersService } from './users.service';
/* controllers */
import { UsersController } from './users.controller';
/* repositories */
import { UserRepository } from './repositories/user.repository';
/* strategy */
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`, // JWTトークンは文字列にしないとエラー
      signOptions: { expiresIn: '1200s' },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
