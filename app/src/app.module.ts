/**
 * app.module
 * @package src
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* controllers */
import { AppController } from './app.controller';
/* services */
import { AppService } from './app.service';
/* modules */
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TodosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
