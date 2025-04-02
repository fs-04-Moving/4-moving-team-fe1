import { DriverWithMeta } from '@/types/move.type';
import ChipEstimateStatus from '../atoms/ChipEstimateStatus';
import ChipMovingType from '../atoms/ChipMovingType';
import DriverInfoBoxA from './DriverInfoBoxA';

/**
 * DriverCardInEstimate 컴포넌트
 *
 * 견적내역에서 사용되는 카드 컴포넌트입니다.
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
 *   summary="안전하고 깔끔한 이사 도와드립니다."
 *   description="20년 경력의 베테랑 이사 전문가입니다."
 *   countCompleteMoving={334}
 *   isLiked={true}
 *   countLike={136}
 *   services={['smallMove', 'homeMove']}
 *   isDirectEstimate={true}
 *   estimatePrice={1800000}
 * />
 */
function DriverCardInEstimate({
  profileImage,
  nickname,
  experience,
  summary,
  countCompleteMoving,
  isLiked,
  countLike,
  services,
  isDirectEstimate,
  estimatePrice,
}: DriverWithMeta) {
  return (
    <div className="flex flex-col justify-between gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[222px] md:w-[600px] lg:w-[688px] lg:h-[280px] px-3.5 py-4">
      <div className="flex gap-2.5">
        {services.map((service, index) => (
          <ChipMovingType key={index} type={service} />
        ))}
        {isDirectEstimate ? <ChipEstimateStatus type="assigned" /> : ''}
      </div>
      {/* 기사 한줄 소개 */}
      <div className="text-[14px] lg:text-2xl">{summary}</div>
      {/* 기사 소개 박스 */}
      <DriverInfoBoxA
        profileImage={profileImage}
        nickname={nickname}
        experience={experience}
        countCompleteMoving={countCompleteMoving}
        isLiked={isLiked}
        countLike={countLike}
      />
      <div className="flex justify-end items-end gap-2 lg:gap-4">
        <span className="text-[14px] lg:text-lg leading-none">견적 금액</span>
        <span className="text-lg lg:text-2xl font-bold leading-none relative top-[1.5px]">{`${estimatePrice.toLocaleString()}원`}</span>
      </div>
    </div>
  );
}

export default DriverCardInEstimate;
