import { ServiceType } from '@/types/move.type';
import ChipEstimateStatus from '../atoms/ChipEstimateStatus';
import ChipMovingType from '../atoms/ChipMovingType';
import WorkerInfoBoxA from './WorkerInfoBoxA';

type Props = {
  profileImage: string;
  nickname: string;
  experience: number;
  summary: string;
  confirmedEstimatesCount: number;
  isFavorite: boolean;
  favoritesCount: number;
  services: ServiceType[];
  isDirectEstimate: boolean;
  price: number;
  reviewsAverage: number;
  reviewsCount: number;
};

/**
 * WorkerCardInEstimate 컴포넌트
 *
 * 견적 내역 리스트에서 사용되는 기사 카드 컴포넌트입니다.
 * 서비스 유형 칩, 기사 프로필 정보, 기사 소개, 지정 견적 여부, 견적 금액 등을 시각적으로 구성합니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 연수
 * @param {string} summary - 기사 한줄 소개
 * @param {number} confirmedEstimatesCount - 해당 기사의 견적 확정 건수
 * @param {boolean} isFavorite - 사용자가 해당 기사를 찜했는지 여부
 * @param {number} favoritesCount - 이 기사를 찜한 사용자 수
 * @param {ServiceType[]} services - 기사가 제공하는 이사 서비스 유형 배열
 * @param {boolean} isDirectEstimate - 지정 견적 여부
 * @param {number} price - 견적 금액
 * @param {number} reviewsAverage - 리뷰 평균
 * @param {number} reviewsCount - 리뷰 개수
 *
 * @example
 * <WorkerCardInEstimate
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   summary="안전하고 깔끔한 이사 도와드립니다."
 *   confirmedEstimatesCount={334}
 *   isFavorite={true}
 *   favoritesCount={136}
 *   services={['smallMove', 'homeMove']}
 *   isDirectEstimate={true}
 *   price={1800000}
 *   reviewsAverage={4.7}
 *   reviewsCount={108}
 * />
 */
function WorkerCardInEstimate({
  profileImage,
  nickname,
  experience,
  summary,
  confirmedEstimatesCount,
  isFavorite,
  favoritesCount,
  services,
  isDirectEstimate,
  price,
  reviewsAverage,
  reviewsCount,
}: Props) {
  return (
    <div className="flex flex-col justify-between shadow-xs gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[222px] md:w-[600px] lg:w-[688px] lg:h-[280px] px-3.5 py-4">
      <div className="flex gap-2.5">
        {services.map((service, index) => (
          <ChipMovingType key={index} type={service} />
        ))}
        {isDirectEstimate ? <ChipEstimateStatus type="assigned" /> : ''}
      </div>
      {/* 기사 한줄 소개 */}
      <div className="text-[14px] lg:text-2xl">{summary}</div>
      {/* 기사 소개 박스 */}
      <WorkerInfoBoxA
        reviewsAverage={reviewsAverage}
        reviewsCount={reviewsCount}
        profileImage={profileImage}
        nickname={nickname}
        experience={experience}
        confirmedEstimatesCount={confirmedEstimatesCount}
        isFavorite={isFavorite}
        favoritesCount={favoritesCount}
      />
      <div className="flex justify-end items-end gap-2 lg:gap-4">
        <span className="text-[14px] lg:text-lg leading-none">견적 금액</span>
        <span className="text-lg lg:text-2xl font-bold leading-none relative top-[1.5px]">{`${price ? price.toLocaleString() : '-'}원`}</span>
      </div>
    </div>
  );
}

export default WorkerCardInEstimate;
