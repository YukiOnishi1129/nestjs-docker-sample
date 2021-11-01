import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* modules */
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
/* services */
import { TodosService } from './todos.service';
/* controllers */
import { TodosController } from './todos.controller';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';
/* strategy */
import { JwtStrategy } from '../common/jwt/strategy/jwt.strategy';

@Module({
  // repositoryをcontroller, serviceで呼び出すための設定
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
