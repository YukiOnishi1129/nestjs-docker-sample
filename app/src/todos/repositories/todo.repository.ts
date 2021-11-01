import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
/* entities */
import { Todo } from '../entities/todo.entity';
/* dto */
import { CreateTodoDto } from '../dto/create-todo.dto';
import { FindTodoListResponseDto } from '../dto/find-todo.dto';

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

    console.log(todo);
    return todo;
  }

  /**
   * 新規登録
   * @param {CreateTodoDto}
   * @param {User} user
   * @returns
   */
  async createTodo({ title }: CreateTodoDto, userId: number) {
    const todo = new Todo();
    todo.title = title;
    todo.userId = userId;

    try {
      await todo.save();
      delete todo.user;

      return todo;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
