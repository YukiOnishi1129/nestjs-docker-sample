import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
/* entities */
import { Todo } from '../../todos/entities/todo.entity';

interface Context {
  id: number;
  userMax: number;
}

define(Todo, (faker: typeof Faker, context: Context) => {
  const { id, userMax } = context;
  const userId = Math.floor(Math.random() * userMax) + 1;

  const todo = new Todo();
  todo.title = `${faker.lorem.word()}${id}`;
  todo.userId = userId;

  return todo;
});
