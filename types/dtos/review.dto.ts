import { Estimate } from '../entities/estimate.entity';
import { Review } from '../entities/review.entity';

// 고객의 '내가 작성한 리뷰' 목록에 사용합니다.
export type CustomerMyReviewListDto =
  | Review
  | Pick<
      Estimate,
      | 'serviceType'
      | 'workerProfileImage'
      | 'workerNickname'
      | 'movingDate'
      | 'price'
    >;
