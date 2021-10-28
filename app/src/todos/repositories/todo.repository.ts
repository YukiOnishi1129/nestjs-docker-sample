import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';

// Repository層でDBデータの操作を行う
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo({ title }: CreateTodoDto) {
    const todo = new Todo();
    todo.title = title;

    try {
      await todo.save();

      return todo;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
