import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
/* services */
import { TodosService } from './todos.service';
/* dto */
import { CreateTodoDto, CreateTodoResponseDto } from './dto/create-todo.dto';
import { UpdateTodoDto, UpdateTodoResponseDto } from './dto/update-todo.dto';
import {
  FindTodoListResponseDto,
  FindTodoResponseDto,
} from './dto/find-todo.dto';
/* entities */
import { Todo } from './entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiBadRequestResponse({
    description: '入力値のフォーマットエラー',
  })
  @ApiInternalServerErrorResponse({
    description: 'DBサーバ接続エラー',
  })
  @ApiCreatedResponse({
    description: 'タスク作成完了',
    type: CreateTodoResponseDto,
  })
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'タスク一覧取得完了',
    type: FindTodoListResponseDto,
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'タスク単体取得完了',
    type: FindTodoResponseDto,
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOne(id);
    return todo;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
