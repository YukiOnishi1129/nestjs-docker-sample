import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
/* entities */
import { User } from '../../users/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = 'password'; // サンプルのため仮設定

  return user;
});
