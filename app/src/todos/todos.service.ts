import { Injectable, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';

@ApiTags('todos')
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  @Post()
  @ApiBadRequestResponse({
    description: '入力値のフォーマットエラー',
  })
  @ApiInternalServerErrorResponse({
    description: 'DBサーバ接続エラー',
  })
  async create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    await this.todoRepository.createTodo(createTodoDto);
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
