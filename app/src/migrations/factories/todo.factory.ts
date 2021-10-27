import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
import { Todo } from '../../todos/entities/todo.entity';

define(Todo, (faker: typeof Faker) => {
  const todo = new Todo();
  todo.title = `${faker.lorem.word()}`;

  return todo;
});
