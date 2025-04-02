import RatingSummary from '@/components/molecules/RatingSummary';
import UserAvartar from '@/components/atoms/UserAvartar';
import LikeCount from '@/components/molecules/LikeCount';
import DriverCardInSearch from '@/components/organisms/DriverCardInSearch';
import ChipMovingType from '@/components/atoms/ChipMovingType';
import { DriverWithMeta } from '@/types/move.type';
import imgAvartar from '@/assets/images/avatartion-3.svg';

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
  services: { type: 'smallMove' },
};

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>
      <ChipMovingType type="smallMove" />
      <ChipMovingType type="officeMove" />
      <ChipMovingType type="homeMove" />
      <UserAvartar />
      <UserAvartar />
      <RatingSummary rating={4.5} reviewCount={231} />
      <LikeCount isLiked={true} countLike={136} />
      <LikeCount isLiked={false} countLike={209} />
      <DriverCardInSearch {...mock} />
    </div>
  );
}

export default page;
