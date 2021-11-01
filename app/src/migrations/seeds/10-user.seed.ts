import { Factory, Seeder } from 'typeorm-seeding';
/* entities */
import { User } from '../../users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory) {
    await factory(User)().createMany(3);
  }
}
