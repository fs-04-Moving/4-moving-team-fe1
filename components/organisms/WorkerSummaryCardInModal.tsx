import UserAvartar from '../atoms/UserAvartar';
import ChipMovingType from '../atoms/ChipMovingType';
import { ServiceType } from '@/types/move.type';

type Props = {
  serviceType: ServiceType;
  profileImage: string;
  nickname: string;
  movingDate: Date;
  price: number;
  createdAt: Date;
};

/**
 * WorkerSummaryCardInModal 컴포넌트
 *
 * 모달 내에서 간단한 이사 기사 요약 정보를 보여주는 카드 컴포넌트입니다.
 * 기사 프로필 이미지, 닉네임, 이사 서비스 유형, 이사일, 견적가 등을 표시합니다.
 * 반응형 디자인을 지원하며, 카드 형태로 정보를 간결하게 제공합니다.
 *
 * @param {ServiceType} serviceType - 이사 서비스 유형 (예: 'smallMove', 'homeMove', 'officeMove')
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {Date} movingDate - 실제 이사 예정 날짜
 * @param {number} price - 견적 금액 (단위: 원)
 * @param {Date} createdAt - 카드 생성일 (현재 사용되지 않음)
 *
 * @example
 * <WorkerSummaryCardInModal
 *   serviceType="homeMove"
 *   profileImage="/img/profile.png"
 *   nickname="김이사"
 *   movingDate={new Date('2024-06-01')}
 *   price={210000}
 *   createdAt={new Date('2024-05-30')}
 * />
 */

function WorkerSummaryCardInModal({
  serviceType,
  profileImage,
  nickname,
  movingDate,
  price,
}: Props) {
  const formattedMovingDate = movingDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col justify-between bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] sm:w-full shadow-xs px-3.5 pt-4 pb-2.5 ">
      <div className="flex gap-2.5 justify-between">
        <ChipMovingType type={serviceType} />
      </div>
      {/* 기사 소개 박스 */}
      <div
        className="flex justify-between items-center shadow-xs
      whitespace-nowrap
       bg-GrayScale-50 border-Line-100 border-b-[1px]
        gap-3 rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-4 lg:h-[144px]"
      >
        <UserAvartar imgUrl={profileImage} sizeInLarge={56} />
        <div
          className="flex-1 flex flex-col justify-between h-[52px] lg:h-[112px] lg:justify-center
        lg:gap-4"
        >
          {/* 기사 이름 */}
          <div className="flex justify-between">
            <span className="text-[14px] lg:text-[16px]">{nickname} 기사님</span>
          </div>
          {/* 이사일, 견적가, 별점 */}
          <div className="flex items-center justify-between md:justify-normal text-[16px] lg:text-xl md:gap-2.5 lg:gap-4 ">
            <span className="flex gap-1.5 lg:gap-3">
              <span className="text-GrayScale-300">이사일</span>
              <span>{formattedMovingDate}</span>
            </span>
            <span className="text-GrayScale-100">|</span>
            <span className="flex gap-1.5 lg:gap-3">
              <span className="text-GrayScale-300">견적가</span>
              <span>{`${price ? price.toLocaleString() : '-'}원`}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerSummaryCardInModal;
