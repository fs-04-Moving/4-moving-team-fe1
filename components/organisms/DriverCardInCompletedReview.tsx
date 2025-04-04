import { DriverWithMeta } from '@/types/move.type';
import UserAvartar from '../atoms/UserAvartar';
import RatingSummary from '../molecules/RatingSummary';
import { CustomerMyReviewListDto } from '@/types/dtos/review.dto';
import ChipMovingType from '../atoms/ChipMovingType';

/**
 * DriverCardInLiked 컴포넌트
 *
 * 찜한 기사 목록에서 사용되는 카드 컴포넌트입니다.
 * 기사 요약 정보를 카드로 구성하여 보여줍니다.
 *
 * @param {DriverWithMeta} props - 기사 정보와 메타 데이터를 포함한 Driver 확장 타입
 *
 * @example
 * <DriverCardInEstimate
 *   id="1"
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   countCompleteMoving={334}
 *   isLiked={true}
 *   countLike={136}
 *   services={['smallMove', 'homeMove']}
 * />
 */
function DriverCardInCompletedReview({
  serviceType,
  workerProfileImage,
  workerNickname,
  movingDate,
  price,
}: CustomerMyReviewListDto) {
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
              {movingDate}
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
