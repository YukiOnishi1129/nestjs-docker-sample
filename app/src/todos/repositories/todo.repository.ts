import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
/* dto */
import { CreateTodoDto } from '../dto/create-todo.dto';

// Repository層でDBデータの操作を行う
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  /**
   * 取得処理
   * @param {number} id
   * @returns
   */
  async findTodo(id: number) {
    const todo = await this.findOne({ id });

    if (!todo) throw new NotFoundException('そのタスクは存在しません。');

    return todo;
  }

  /**
   * 新規登録
   * @param {CreateTodoDto}
   * @returns
   */
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
