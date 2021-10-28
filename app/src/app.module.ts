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
  imports: [TypeOrmModule.forRoot(), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
