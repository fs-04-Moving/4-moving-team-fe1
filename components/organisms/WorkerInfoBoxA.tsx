import React from 'react';
import UserAvartar from '../atoms/UserAvartar';
import LikeCount from '../molecules/LikeCount';
import RatingSummary from '../molecules/RatingSummary';
import clsx from 'clsx';

type Props = {
  profileImage: string;
  nickname: string;
  isFavorite: boolean;
  favoritesCount: number;
  experience: number;
  reviewsAverage: number;
  reviewsCount: number;
  confirmedEstimateCount: number;
  isResponsive?: boolean;
};

/**
 * WorkerInfoBoxA 컴포넌트
 *
 * 기사님의 핵심 정보를 요약하여 보여주는 카드 UI 컴포넌트입니다.
 * 프로필 이미지, 닉네임, 경력, 완료된 이사 건수, 찜 여부 및 찜 수, 리뷰 평점과 개수를 시각적으로 표현합니다.
 * 기사 리스트, 기사 검색 결과, 견적 페이지 등 다양한 화면에서 재사용할 수 있도록 설계되어 있습니다.
 *
 * @component
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {boolean} isFavorite - 현재 사용자가 해당 기사를 찜했는지 여부
 * @param {number} favoritesCount - 해당 기사를 찜한 사용자 수
 * @param {number} experience - 기사 경력 (단위: 년)
 * @param {number} reviewsAverage - 리뷰 평균 평점 (0~5 범위)
 * @param {number} reviewsCount - 총 리뷰 수
 * @param {number} confirmedEstimateCount - 완료된 이사(견적 확정) 건수
 * @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @example
 * <WorkerInfoBoxA
 *   profileImage="/images/driver1.png"
 *   nickname="김코드"
 *   isFavorite={true}
 *   favoritesCount={136}
 *   experience={7}
 *   reviewsAverage={4.8}
 *   reviewsCount={178}
 *   confirmedEstimateCount={334}
 *   isResponsive={false}
 * />
 */
function WorkerInfoBoxA({
  profileImage,
  nickname,
  isFavorite,
  favoritesCount,
  experience,
  reviewsAverage,
  reviewsCount,
  confirmedEstimateCount,
  isResponsive = true,
}: Props) {
  return (
    <div
      className={clsx(
        `flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 h-[78px] shadow-2xs`,
        isResponsive ? 'lg:px-[18px] lg:py-4 lg:gap-6 lg:[92px]' : ''
      )}
    >
      <UserAvartar imgUrl={profileImage} isResponsive={isResponsive} />
      <div className="flex-1 flex flex-col justify-between h-[58px]">
        {/* 기사 이름 */}
        <div className="flex justify-between">
          <span
            className={clsx('text-[14px]', isResponsive ? 'lg:text-lg' : '')}
          >
            {nickname} 기사님
          </span>
          <LikeCount
            isFavorite={isFavorite}
            favoritesCount={favoritesCount}
            isResponsive={isResponsive}
          />
        </div>
        {/* 별점, 경력, 확정 건수 */}
        <div
          className={clsx(
            'flex items-center gap-1.5 text-[14px]',
            isResponsive
              ? 'lg:text-[16px] md:gap-2.5 lg:gap-4 md:justify-normal'
              : ''
          )}
        >
          <RatingSummary
            reviewsAverage={reviewsAverage}
            reviewsCount={reviewsCount}
            isResponsive={isResponsive}
          />
          <span className="text-GrayScale-100">|</span>
          <span>
            <span className="text-GrayScale-300">경력</span>
            {` ${experience}년`}
          </span>
          <span className="text-GrayScale-100">|</span>
          <span>
            {`${confirmedEstimateCount}건 `}
            <span className="text-GrayScale-300">확정</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WorkerInfoBoxA;
