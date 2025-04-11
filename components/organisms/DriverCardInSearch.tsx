import { ServiceType } from '@/types/move.type';
import ChipMovingType from '../atoms/ChipMovingType';
import DriverInfoBoxA from './DriverInfoBoxA';

type Props = {
  profileImage: string;
  nickname: string;
  experience: number;
  summary: string;
  isLiked: boolean;
  favoritesCount: number;
  serviceTypes: ServiceType[];
  reviewsEverage: number;
  reviewsCount: number;
  confirmedEstimatesCount: number;
};

/**
 * DriverCardInSearch 컴포넌트
 *
 * 기사 검색 결과 또는 기사 리스트 페이지에서 사용되는 카드 UI 컴포넌트입니다.
 * 기사 한줄 소개, 제공 서비스 유형, 프로필 정보(사진, 이름, 경력, 찜 상태 등)를 시각적으로 구성하여 표시합니다.
 * '지정 견적 요청 여부'에 따라 ChipEstimateStatus가 함께 표시됩니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 (년 단위)
 * @param {string} summary - 기사 한줄 소개
 * @param {number} countCompleteMoving - 기사 완료 이사 건수
 * @param {boolean} isFavorite - 사용자가 찜한 기사 여부
 * @param {number} favoritesCount - 이 기사를 찜한 총 사용자 수
 * @param {ServiceType[]} serviceTypes - 기사가 제공하는 이사 서비스 유형 리스트
 *
 * @example
 * <DriverCardInSearch
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   summary="안전하고 깔끔한 이사 도와드립니다."
 *   countCompleteMoving={334}
 *   isFavorite={true}
 *   favoritesCount={136}
 *   serviceTypes={['smallMove', 'homeMove']}
 * />
 */

function DriverCardInSearch({
  profileImage,
  nickname,
  experience,
  summary,
  serviceTypes,
  reviewsEverage,
  reviewsCount,
  confirmedEstimatesCount,
  favoritesCount,
  isLiked,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[188px] md:w-[600px] lg:w-[955px] lg:h-[230px] px-3.5 py-4 lg:px-6 lg:py-5 shadow-xs">
      <div className="flex gap-2.5">
        {serviceTypes.map((service, index) => (
          <ChipMovingType key={index} type={service} />
        ))}
      </div>
      {/* 기사 한줄 소개 */}
      <div className="text-[14px] lg:text-2xl">{summary}</div>
      {/* 기사 소개 박스 */}
      <DriverInfoBoxA
        profileImage={profileImage}
        nickname={nickname}
        experience={experience}
        reviewsEverage={reviewsEverage}
        reviewsCount={reviewsCount}
        confirmedEstimatesCount={confirmedEstimatesCount}
        isLiked={isLiked}
        favoritesCount={favoritesCount}
      />
    </div>
  );
}

export default DriverCardInSearch;
