import faker from 'faker';

import { User } from '..';

export const makeUser = (): User => ({
  name: faker.name.firstName(),
  avatarUrl: faker.image.imageUrl(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
});
