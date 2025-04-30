import { ServiceType } from '@/types/move.type';
import ChipMovingType from '../atoms/ChipMovingType';
import UserAvartar from '../atoms/UserAvartar';
import LikeCount from '../molecules/LikeCount';
import RatingSummary from '../molecules/RatingSummary';

type Props = {
  profileImage: string;
  nickname: string;
  experience: number;
  confirmedEstimatesCount: number;
  isFavorite: boolean;
  favoritesCount: number;
  services: ServiceType[];
  reviewsAverage: number;
  reviewsCount: number;
};

/**
 * WorkerCardInPendingReview 컴포넌트
 *
 * 작성 가능한 리뷰 목록에서 사용되는 기사 카드 컴포넌트입니다.
 * 기사 이름, 경력, 확정 이사 건수, 별점, 서비스 유형, 찜 여부 등의 정보를 시각적으로 표현합니다.
 * 리뷰 작성 유도 인터페이스에서 사용자에게 보여주는 용도입니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 연수
 * @param {number} confirmedEstimatesCount - 확정된 이사 건수
 * @param {boolean} isFavorite - 사용자가 해당 기사를 찜했는지 여부
 * @param {number} favoritesCount - 해당 기사를 찜한 사용자 수
 * @param {ServiceType[]} services - 기사 제공 서비스 유형 리스트
 * @param {number} reviewsAverage - 리뷰 평균
 * @param {number} reviewsCount - 리뷰 개수
 *
 * @example
 * <WorkerCardInPendingReview
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   confirmedEstimatesCount={334}
 *   isFavorite={true}
 *   favoritesCount={136}
 *   services={['smallMove', 'homeMove']}
 *   reviewsAverage={4.7}
 *   reviewsCount={108}
 * />
 */
function WorkerCardInPendingReview({
  profileImage,
  nickname,
  experience,
  confirmedEstimatesCount,
  isFavorite,
  favoritesCount,
  services,
  reviewsAverage,
  reviewsCount,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-2 shadow-xs bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[150px] md:w-[600px] lg:w-[688px] lg:h-[202px] px-3.5 py-4">
      <div className="flex gap-2.5">
        {services.map((service, index) => (
          <ChipMovingType key={index} type={service} />
        ))}
      </div>
      {/* 기사 소개 박스 */}
      <div className="flex justify-between items-center gap-3 shadow-xs bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-6 lg:h-[112px]">
        <UserAvartar imgUrl={profileImage} sizeInLarge={80} />
        <div className="flex-1 flex flex-col justify-between h-[58px] lg:h-[68px]">
          {/* 기사 이름 */}
          <div className="flex justify-between">
            <span className="text-[14px] lg:text-lg">{nickname} 기사님</span>
            <LikeCount
              isFavorite={isFavorite}
              favoritesCount={favoritesCount}
            />
          </div>
          {/* 별점, 경력, 확정 건수 */}
          <div className="flex items-center justify-between md:justify-normal text-[14px] lg:text-[16px] md:gap-2.5 lg:gap-4">
            <RatingSummary
              reviewsAverage={reviewsAverage}
              reviewsCount={reviewsCount}
            />
            <span className="text-GrayScale-100">|</span>
            <span>
              <span className="text-GrayScale-300">경력</span>
              {` ${experience}년`}
            </span>
            <span className="text-GrayScale-100">|</span>
            <span>
              {`${confirmedEstimatesCount}건 `}
              <span className="text-GrayScale-300">확정</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerCardInPendingReview;
