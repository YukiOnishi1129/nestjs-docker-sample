import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* controllers */
import { AppController } from './app.controller';
/* services */
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '',
    // }),
    TodosModule,
    TodosModule,
  ],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
