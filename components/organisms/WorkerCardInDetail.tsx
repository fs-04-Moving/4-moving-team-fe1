import ChipMovingType from "../atoms/ChipMovingType";
import UserAvartar from "../atoms/UserAvartar";
import LikeCount from "../molecules/LikeCount";
import RatingSummary from "../molecules/RatingSummary";

export type WorkerCardInDetailProps = {
  id: string;
  profileImage: string;
  nickname: string;
  experience: string;
  confirmedEstimatesCount: number;
  isFavorite: boolean;
  summary: string;
  favoritesCount: number;
  services: string[];
  reviewsAverage: number;
  reviewsCount: number;
};

/**
 * WorkerCardInLiked 컴포넌트
 *
 * 사용자가 찜한 기사 리스트에서 보여지는 카드 컴포넌트입니다.
 * 기사 서비스 타입(Chip), 프로필 이미지, 이름, 경력, 찜 수, 별점, 리뷰 수, 확정 건수 등의 정보를 시각적으로 표시합니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 연수
 * @param {number} confirmedEstimatesCount - 확정 이사 건수
 * @param {boolean} isFavorite - 사용자가 이 기사를 찜했는지 여부
 * @param {number} favoritesCount - 이 기사를 찜한 사용자 수
 * @param {ServiceType[]} services - 기사가 제공하는 서비스 유형 리스트
 * @param {number} reviewsAverage - 리뷰 평균
 * @param {number} reviewsCount - 리뷰 개수
 *
 * @example
 * <WorkerCardInLiked
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
function WorkerCardInDetail({
  profileImage,
  nickname,
  experience,
  confirmedEstimatesCount,
  isFavorite,
  favoritesCount,
  summary,
  services,
  reviewsAverage,
  reviewsCount,
}: WorkerCardInDetailProps) {
  console.log(experience, confirmedEstimatesCount);
  return (
    <div className="flex flex-col justify-between gap-2 shadow-xs bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl lg:w-[955px] w-full  px-3.5 py-4">
      <div className="flex gap-2.5">
        {services.map((service, index) => (
          <ChipMovingType key={index} type={service} />
        ))}
      </div>
      {/* 기사 소개 박스 */}
      {/* 기사 코멘트 */}
      <div className="text-GrayScale-600 text-[14px] font-normal lg:text-xl">
        {summary}
      </div>
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

export default WorkerCardInDetail;
