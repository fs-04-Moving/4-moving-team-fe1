import UserAvartar from '../atoms/UserAvartar';
import RatingSummary from '../molecules/RatingSummary';
import ChipMovingType from '../atoms/ChipMovingType';
import { ServiceType } from '@/types/move.type';

type Props = {
  serviceType: ServiceType;
  workerProfileImage: string;
  workerNickname: string;
  movingDate: Date;
  price: number;
};

/**
 * DriverCardInCompletedReview 컴포넌트
 *
 * 사용자가 작성한 리뷰 페이지 등에서 보여지는 기사 카드입니다.
 * 서비스 타입, 기사 프로필, 기사 이름, 이사일, 견적가, 별점 등의 정보를 표시합니다.
 * 주로 리뷰 완료된 기사 정보를 요약해서 보여주는 데 사용됩니다.
 *
 * @param {ServiceType} serviceType - 이사 서비스 유형 ('smallMove', 'homeMove', 'officeMove')
 * @param {string} workerProfileImage - 기사 프로필 이미지 URL
 * @param {string} workerNickname - 기사 닉네임
 * @param {Date} movingDate - 이사 완료 날짜 (Date 객체)
 * @param {number} price - 견적 금액
 *
 * @example
 * <DriverCardInCompletedReview
 *   serviceType="smallMove"
 *   workerProfileImage="/images/driver1.png"
 *   workerNickname="김코드"
 *   movingDate={new Date('2024-03-15')}
 *   price={250000}
 * />
 */

function DriverCardInCompletedReview({
  serviceType,
  workerProfileImage,
  workerNickname,
  movingDate,
  price,
}: Props) {
  const formattedDate = movingDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col justify-between gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[150px] md:w-[600px] lg:w-[688px] lg:h-[202px] px-3.5 py-4">
      <div className="flex gap-2.5">
        <ChipMovingType type={serviceType} />
      </div>
      {/* 기사 소개 박스 */}
      <div className="flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-6 lg:h-[112px]">
        <UserAvartar imgUrl={workerProfileImage} sizeInLarge={80} />
        <div className="flex-1 flex flex-col justify-between h-[58px] lg:h-[68px]">
          {/* 기사 이름 */}
          <div className="flex justify-between">
            <span className="text-[14px] lg:text-lg">
              {workerNickname} 기사님
            </span>
          </div>
          {/* 별점, 경력, 확정 건수 */}
          <div className="flex items-center justify-between md:justify-normal text-[14px] lg:text-[16px] md:gap-2.5 lg:gap-4">
            <RatingSummary rating={4.9} reviewCount={178} />
            <span className="text-GrayScale-100">|</span>
            <span>
              <span className="text-GrayScale-300">이사일</span>
              {formattedDate}
            </span>
            <span className="text-GrayScale-100">|</span>
            <span>
              <span className="text-GrayScale-300">견적가</span>
              {price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverCardInCompletedReview;
