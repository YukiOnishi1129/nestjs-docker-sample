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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GetUser } from '../users/get-user.decorator';
/* services */
import { TodosService } from './todos.service';
/* dto */
import { CreateTodoDto, CreateTodoResponseDto } from './dto/create-todo.dto';
import { UpdateTodoDto, UpdateTodoResponseDto } from './dto/update-todo.dto';
import {
  FindTodoListResponseDto,
  FindTodoResponseDto,
} from './dto/find-todo.dto';
import { RemoveTodoResponseDto } from './dto/remove-todo.dto';
/* entities */
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
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
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'タスク一覧取得完了',
    type: FindTodoListResponseDto,
  })
  findAll(): Promise<Todo[]> {
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    const todo = await this.todosService.findOne(id);
    return todo;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'タスク更新完了',
    type: UpdateTodoResponseDto,
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'タスク削除完了',
    type: RemoveTodoResponseDto,
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  async remove(@Param('id') id: number): Promise<Todo> {
    return await this.todosService.remove(id);
  }
}
