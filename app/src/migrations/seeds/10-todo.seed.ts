// import { getRepository, Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Todo } from '../../todos/entities/todo.entity';

export default class CreateTodos implements Seeder {
  public async run(factory: Factory) {
    // const todoRepository = getRepository(Todo);
    await factory(Todo)().createMany(3); // 3レコード作成
  }
}
