import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* dto */
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  FindTodoListResponseDto,
  // FindTodoResponseDto,
} from './dto/find-todo.dto';
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
   * @param {number} userId
   * @returns
   */
  async create(createTodoDto: CreateTodoDto, userId: number) {
    return await this.todoRepository.createTodo(createTodoDto, userId);
  }

  /**
   * Todo全取得処理
   * @returns
   */
  async findAll(userId: number): Promise<FindTodoListResponseDto> {
    const dataList = await this.todoRepository.findAll(userId);

    if (!dataList || (dataList && dataList.length === 0))
      return {
        todos: [],
      };

    const todoList = dataList.map((todo) => {
      delete todo.user.password;
      return {
        id: todo.id,
        title: todo.title,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
        user: {
          id: todo.user.id,
          email: todo.user.email,
          createdAt: todo.user.createdAt,
          updatedAt: todo.user.updatedAt,
        },
      };
    });

    return {
      todos: todoList,
    };
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
