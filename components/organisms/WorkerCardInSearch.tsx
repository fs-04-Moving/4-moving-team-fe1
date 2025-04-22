import clsx from 'clsx';
import ChipMovingType from '../atoms/ChipMovingType';
import WorkerInfoBoxA from './WorkerInfoBoxA';

type Props = {
  profileImage: string;
  nickname: string;
  experience: number;
  summary: string;
  isFavorite: boolean;
  favoritesCount: number;
  services: string[];
  reviewsAverage: number;
  reviewsCount: number;
  confirmedEstimateCount: number;
  isResponsive?: boolean;
};

/**
 * WorkerCardInSearch 컴포넌트
 *
 * 기사 검색 결과 페이지 또는 기사 리스트 페이지에서 사용되는 카드 UI 컴포넌트입니다.
 * 프로필 이미지, 닉네임, 경력, 리뷰 정보, 찜 여부 및 제공 서비스 유형을 포함한
 * 기사 정보를 시각적으로 구성하여 보여줍니다.
 *
 * @component
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 (단위: 년)
 * @param {string} summary - 기사 소개 문구
 * @param {ServiceType[]} services - 제공하는 이사 서비스 유형 리스트
 * @param {number} reviewsAverage - 평균 리뷰 평점
 * @param {number} reviewsCount - 전체 리뷰 수
 * @param {number} favoritesCount - 찜한 사용자 수
 * @param {number} confirmedEstimateCount - 견적 확정 건수
 * @param {boolean} isFavorite - 현재 사용자가 이 기사를 찜했는지
 * @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @example
 * <WorkerCardInSearch
 *   profileImage="/images/sample.jpg"
 *   nickname="김코드"
 *   experience={7}
 *   summary="안전하고 깔끔한 이사 도와드립니다."
 *   services={['smallMove', 'homeMove']}
 *   reviewsAverage={4.8}
 *   reviewsCount={153}
 *   favoritesCount={130}
 *   confirmedEstimateCount={87}
 *   isFavorite={true}
 *   isResponsive={false}
 * />
 */

function WorkerCardInSearch({
  profileImage,
  nickname,
  experience,
  summary,
  services,
  reviewsAverage,
  reviewsCount,
  favoritesCount,
  confirmedEstimateCount,
  isFavorite,
  isResponsive = true,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-2 bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl min-w-[327px] h-[188px]  px-3.5 py-4 shadow-xs',
        isResponsive ? 'lg:px-6 lg:py-5 md:w-full lg:h-[230px]' : ''
      )}
    >
      <div className="flex gap-2.5">
        {services.map((service, index) => (
          <ChipMovingType
            key={index}
            type={service}
            isResponsive={isResponsive}
          />
        ))}
      </div>
      {/* 기사 한줄 소개 */}
      <div className={clsx('text-[14px]', isResponsive ? 'lg:text-2xl' : '')}>
        {summary}
      </div>
      {/* 기사 소개 박스 */}
      <WorkerInfoBoxA
        profileImage={profileImage}
        nickname={nickname}
        experience={experience}
        reviewsAverage={reviewsAverage}
        reviewsCount={reviewsCount}
        confirmedEstimateCount={confirmedEstimateCount}
        isFavorite={isFavorite}
        favoritesCount={favoritesCount}
        isResponsive={isResponsive}
      />
    </div>
  );
}

export default WorkerCardInSearch;
