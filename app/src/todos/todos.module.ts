import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';

@Module({
  // repositoryをcontroller, serviceで呼び出すための設定
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
