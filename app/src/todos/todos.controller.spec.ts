import { Test, TestingModule } from '@nestjs/testing';
/* controllers */
import { TodosController } from './todos.controller';
/* services */
import { TodosService } from './todos.service';
/* entities */
import { Todo } from './entities/todo.entity';

describe('TodosController', () => {
  let todoController: TodosController;
  // let todoService: TodosService;
  // let todoRepository: TodoRepository;

  const resultTodo = {
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
  };

  const resultTodoList = [resultTodo] as Todo[];
  const responseTodoList = { todos: resultTodoList };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        // serviceをmock化する
        {
          provide: TodosService,
          useValue: {
            findAll: jest
              .fn()
              .mockReturnValue(Promise.resolve(responseTodoList)),
            create: jest.fn().mockReturnValue(resultTodo),
          },
        },
      ],
    }).compile();
    module.get<TodosService>(TodosService);
    todoController = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  it('should return an array of Todos', async () => {
    const expectResult = {
      todos: resultTodoList,
    };
    expect(
      await todoController.findAll({
        user: {
          userId: 1,
          email: 'test@gmail.com',
        },
      }),
    ).toEqual(expectResult);
  });
});
