import faker from 'faker';

import { CommentGet } from '../interfaces';

export const makeReview = (): CommentGet => ({
  id: faker.datatype.uuid(),
  date: faker.date.past().toString(),
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.imageUrl(),
    isPro: faker.datatype.boolean(),
  },
});

export const makeReviews = () => faker.datatype.array().map(makeReview);
