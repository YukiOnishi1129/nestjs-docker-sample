import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
/* modules */
import { UsersModule } from '../users/users.module';
/* services */
import { TodosService } from './todos.service';
/* controllers */
import { TodosController } from './todos.controller';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';
/* strategy */
import { JwtStrategy } from '../users/strategy/jwt.strategy';

@Module({
  // repositoryをcontroller, serviceで呼び出すための設定
  imports: [UsersModule, TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
