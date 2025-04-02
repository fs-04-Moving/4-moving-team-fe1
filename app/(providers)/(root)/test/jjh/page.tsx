import DriverCardInSearch from '@/components/organisms/DriverCardInSearch';
import { DriverWithMeta } from '@/types/move.type';
import imgAvartar from '@/assets/images/avatartion-3.svg';
import DriverCardInEstimate from '@/components/organisms/DriverCardInEstimate';

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

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>

      <DriverCardInSearch {...mock} />
      <DriverCardInEstimate {...mock} />
    </div>
  );
}

export default page;
