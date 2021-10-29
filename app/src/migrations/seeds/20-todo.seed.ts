import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
/* entities */
import { User } from '../../users/entities/user.entity';
import { Todo } from '../../todos/entities/todo.entity';

export default class CreateTodos implements Seeder {
  public async run(factory: Factory) {
    const todoRepository = getRepository(Todo);
    const todoMax = await todoRepository.count();

    const userRepository = getRepository(User);
    const userMax = await userRepository.count();

    await (async () => {
      // 10個のデータを作成
      for (let insertId = todoMax + 1; insertId <= todoMax + 10; insertId++) {
        await factory(Todo)({
          id: insertId,
          userMax,
        }).create();
      }
      return Promise.resolve();
    })();

    // await factory(Todo)().createMany(3); // 3レコード作成
  }
}
