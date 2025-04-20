import React from 'react';
import UserAvartar from '../atoms/UserAvartar';
import LikeCount from '../molecules/LikeCount';
import RatingSummary from '../molecules/RatingSummary';

type Props = {
  profileImage: string;
  nickname: string;
  isFavorite: boolean;
  favoritesCount: number;
  experience: number;
  reviewsAverage: number;
  reviewsCount: number;
  confirmedEstimateCount: number;
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
}: Props) {
  return (
    <div
      className={`flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 lg:px-[18px] lg:py-4 h-[78px] lg:gap-6 lg:[92px] shadow-2xs`}
    >
      <UserAvartar imgUrl={profileImage} />
      <div className="flex-1 flex flex-col justify-between h-[58px]">
        {/* 기사 이름 */}
        <div className="flex justify-between">
          <span className="text-[14px] lg:text-lg">{nickname} 기사님</span>
          <LikeCount isFavorite={isFavorite} favoritesCount={favoritesCount} />
        </div>
        {/* 별점, 경력, 확정 건수 */}
        <div className="flex items-center gap-1.5  md:justify-normal text-[14px] lg:text-[16px] md:gap-2.5 lg:gap-4">
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
            {`${confirmedEstimateCount}건 `}
            <span className="text-GrayScale-300">확정</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WorkerInfoBoxA;
