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

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.createTodo(createTodoDto);
  }

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

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
