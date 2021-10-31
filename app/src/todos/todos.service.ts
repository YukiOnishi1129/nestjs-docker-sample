import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* entities */
import { User } from '../users/entities/user.entity';
/* dto */
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  /**
   * 新規登録処理
   * @param {CreateTodoDto} createTodoDto
   * @param {User} user
   * @returns
   */
  async create(createTodoDto: CreateTodoDto, user: User) {
    return await this.todoRepository.createTodo(createTodoDto, user);
  }

  /**
   * Todo全取得処理
   * @returns
   */
  async findAll(userId: number) {
    return await this.todoRepository.find({
      relations: ['user'],
      where: [{ userId: userId }],
    });
  }

  /**
   * Todo取得処理
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException('そのタスクは存在しません。');
    }
    return todo;
  }

  /**
   * 更新処理
   * @param {number} id
   * @param {UpdateTodoDto} updateTodoDto
   * @returns
   */
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findTodo(id);
    todo.title = updateTodoDto.title;

    return await todo.save();
  }

  /**
   * 削除処理
   * @param {number} id
   * @returns
   */
  async remove(id: number) {
    const todo = await this.todoRepository.findTodo(id);
    return todo.remove();
  }
}
