import { DriverWithMeta } from '@/types/move.type';
import ChipEstimateStatus from '../atoms/ChipEstimateStatus';
import ChipMovingType from '../atoms/ChipMovingType';
import UserAvartar from '../atoms/UserAvartar';
import LikeCount from '../molecules/LikeCount';
import RatingSummary from '../molecules/RatingSummary';

/**
 * DriverCardInSearch 컴포넌트
 *
 * 검색 결과나 기사 리스트에서 사용되는 카드 컴포넌트입니다.
 * 기사 요약 정보(프로필 이미지, 이름, 경력, 한줄 소개, 별점, 후기 수, 찜 여부, 확정 건수)를 시각적으로 구성하여 보여줍니다.
 *
 * @param {DriverWithMeta} props - 기사 정보와 메타 데이터를 포함한 Driver 확장 타입
 *
 * @example
 * <DriverCardInSearch
 *   id="1"
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   summary="안전하고 깔끔한 이사 도와드립니다."
 *   description="20년 경력의 베테랑 이사 전문가입니다."
 *   countCompleteMoving={334}
 *   isLiked={true}
 *   countLike={136}
 * />
 */
function DriverCardInSearch({
  profileImage,
  nickname,
  experience,
  summary,
  countCompleteMoving,
  isLiked,
  countLike,
}: DriverWithMeta) {
  return (
    <div className="flex flex-col justify-between gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[188px] md:w-[600px] lg:w-[955px] lg:h-[230px] px-3.5 py-4">
      <div className="flex gap-2.5">
        <ChipMovingType type="smallMove" />
        <ChipEstimateStatus type="assigned" />
      </div>
      {/* 기사 한줄 소개 */}
      <div className="text-[14px] lg:text-2xl">{summary}</div>
      {/* 기사 소개 박스 */}
      <div className="flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 h-[78px] lg:h-[92px] lg:gap-6">
        <UserAvartar imgUrl={profileImage} />
        <div className="flex-1 flex flex-col justify-between h-[58px]">
          {/* 기사 이름 */}
          <div className="flex justify-between">
            <span className="text-[14px] lg:text-lg">{nickname} 기사님</span>
            <LikeCount isLiked={isLiked} countLike={countLike} />
          </div>
          {/* 별점, 경력, 확정 건수 */}
          <div className="flex items-center justify-between md:justify-normal text-[14px] lg:text-[16px] md:gap-2.5 lg:gap-4">
            <RatingSummary rating={4.9} reviewCount={178} />
            <span className="text-GrayScale-100">|</span>
            <span>
              <span className="text-GrayScale-300">경력</span>
              {` ${experience}년`}
            </span>
            <span className="text-GrayScale-100">|</span>
            <span>
              {`${countCompleteMoving}건 `}
              <span className="text-GrayScale-300">확정</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverCardInSearch;
