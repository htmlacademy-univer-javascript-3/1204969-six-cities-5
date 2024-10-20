import {
  dateToMonthWordYear,
  dateToYearMonthDay,
} from '../../../shared/lib/date';
import { Rating } from '../../../shared/ui/Rating';
import { ReviewEntity } from '../interfaces';

export const Review: React.FC<ReviewEntity> = ({
  text,
  date,
  rating,
  userName,
  userAvatarSrc,
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={userAvatarSrc}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{userName}</span>
    </div>
    <div className="reviews__info">
      <Rating
        rating={rating}
        containerMix="reviews__rating"
        starsMix="reviews__stars"
        mode="compact"
      />

      <p className="reviews__text">{text}</p>
      <time className="reviews__time" dateTime={dateToYearMonthDay(date)}>
        {dateToMonthWordYear(date)}
      </time>
    </div>
  </li>
);
