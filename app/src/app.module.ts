import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* controllers */
import { AppController } from './app.controller';
/* services */
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '',
    // }),
  TodoModule],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
