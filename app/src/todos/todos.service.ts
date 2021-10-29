import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
   * @returns
   */
  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.createTodo(createTodoDto);
  }

  /**
   * Todo全取得処理
   * @returns
   */
  async findAll() {
    return await this.todoRepository.find();
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
