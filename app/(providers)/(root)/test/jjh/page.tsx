import { DriverWithMeta } from '@/types/move.type';
import imgAvartar from '@/assets/images/avatartion-3.svg';
import DriverCardInEstimate from '@/components/organisms/DriverCardInEstimate';
import DriverCardInLiked from '@/components/organisms/DriverCardInLiked';
import DriverCardInCompletedReview from '@/components/organisms/DriverCardInCompletedReview';
import { Review } from '@/types/entities/review.entity';
import { Estimate } from '@/types/entities/estimate.entity';

const mock: DriverWithMeta = {
  id: '12df02342-234234',
  profileImage: imgAvartar,
  nickname: '몽고르',
  experience: 7,
  summary: '고객님의 물품을 안전하게 운송해 드립니다.',
  description: '이것은 디스크립션',
  countCompleteMoving: 223,
  isLiked: true,
  countLike: 132,
  serviceAreas: { seoul: '서울', incheon: '인천' },
  services: ['smallMove', 'officeMove'],
  isDirectEstimate: true,
  estimatePrice: 180000,
};

const mockCustomerMyReviewListDto: Pick<
  Review & Estimate,
  | 'serviceType'
  | 'workerProfileImage'
  | 'workerNickname'
  | 'movingDate'
  | 'price'
> = {
  serviceType: 'smallMove',
  workerProfileImage: imgAvartar,
  workerNickname: '김주영',
  movingDate: new Date(2024, 11, 17),
  price: 2100000,
};

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>
      <DriverCardInLiked {...mock} />
      {/* <DriverCardInSearch {...mock} /> */}
      <DriverCardInEstimate {...mock} />
      <DriverCardInCompletedReview {...mockCustomerMyReviewListDto} />
    </div>
  );
}

export default page;
