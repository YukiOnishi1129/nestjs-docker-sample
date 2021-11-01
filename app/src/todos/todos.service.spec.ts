import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
/* entities */
import { Todo } from './entities/todo.entity';
/* repositories */
import { TodoRepository } from './repositories/todo.repository';
/* dto */
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindTodoListResponseDto } from './dto/find-todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  let fakeTodoRepository: Partial<TodoRepository>;

  beforeEach(async () => {
    const todoList: Todo[] = [
      {
        id: 1,
        title: 'タスク1',
        userId: 1,
        createdAt: new Date('2021-10-28T08:38:14.237Z'),
        updatedAt: new Date('2021-10-28T08:38:14.237Z'),
        user: {
          id: 1,
          email: 'Lacy.Graham@yahoo.com',
          password: 'hogehoge',
          createdAt: new Date('2021-10-29T07:18:26.729Z'),
          updatedAt: new Date('2021-10-29T07:18:26.729Z'),
        },
      },
    ] as Todo[];

    /**
     * TodoRepositoryのモック関数
     */
    fakeTodoRepository = {
      findAll: (userId: number) => {
        return Promise.resolve(
          todoList.filter((todo) => {
            if (todo.userId === userId) {
              delete todo.user.password;
              return todo;
            }
          }),
        );
      },
      findTodo: (id: number) => {
        return Promise.resolve(todoList.find((todo) => todo.id === id));
      },
      createTodo: ({ title }: CreateTodoDto, userId: number) => {
        const todo = {
          id: Math.floor(Math.random() * 999999),
          title: title,
          userId: userId,
          createdAt: new Date('2021-10-28T08:38:14.237Z'),
          updatedAt: new Date('2021-10-28T08:38:14.237Z'),
          user: {
            id: userId,
            email: 'Lacy.Graham@yahoo.com',
            password: 'hogehoge',
            createdAt: new Date('2021-10-29T07:18:26.729Z'),
            updatedAt: new Date('2021-10-29T07:18:26.729Z'),
          },
        } as Todo;
        todoList.push(todo);
        return Promise.resolve(todo);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        // DIに入れ込むインスタンスをモック化させる
        {
          provide: TodoRepository,
          useValue: fakeTodoRepository, // モック関数
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('【関数テスト】findAll', () => {
    it('【正常系】Todo配列が返却される', async () => {
      const argUserId = 1;
      const expectResult: FindTodoListResponseDto = {
        todos: [
          {
            id: 1,
            title: 'タスク1',
            userId: 1,
            createdAt: new Date('2021-10-28T08:38:14.237Z'),
            updatedAt: new Date('2021-10-28T08:38:14.237Z'),
            user: {
              id: 1,
              email: 'Lacy.Graham@yahoo.com',
              createdAt: new Date('2021-10-29T07:18:26.729Z'),
              updatedAt: new Date('2021-10-29T07:18:26.729Z'),
            },
          },
        ],
      };

      expect(await service.findAll(argUserId)).toEqual(expectResult);
    });
  });
});
