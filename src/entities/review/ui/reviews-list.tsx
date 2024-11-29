import classNames from 'classnames';

import { CommentGet } from '../interfaces';
import { Review } from './review';

type ReviewsListProps = {
  reviews: CommentGet[];
  containerMix?: string;
};

export const ReviewsList: React.FC<ReviewsListProps> = ({
  reviews,
  containerMix,
}) => (
  <section className={classNames('reviews', containerMix)}>
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={`${review.user.name}-${review.date}`} {...review} />
      ))}
    </ul>
  </section>
);
