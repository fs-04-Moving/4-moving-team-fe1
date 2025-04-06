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
  countCompleteMoving: number;
};

/**
 * DriverInfoBoxA 컴포넌트
 *
 * 기사님의 프로필 정보를 요약해서 보여주는 카드형 UI 컴포넌트입니다.
 * 기사님의 닉네임, 프로필 이미지, 경력, 완료한 이사 건수, 찜 여부 및 찜 수, 평점 요약 등을 표시합니다.
 * 사용자에게 기사 선택에 필요한 핵심 정보들을 한눈에 제공하는 역할을 합니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {boolean} isFavorite - 현재 사용자가 이 기사를 찜했는지 여부
 * @param {number} favoritesCount - 해당 기사를 찜한 전체 사용자 수
 * @param {number} experience - 기사 경력 (단위: 년)
 * @param {number} countCompleteMoving - 기사 완료 이사 건수
 *
 * @example
 * <DriverInfoBoxA
 *   profileImage="/images/driver1.png"
 *   nickname="김코드"
 *   isFavorite={true}
 *   favoritesCount={136}
 *   experience={7}
 *   countCompleteMoving={334}
 * />
 */
function DriverInfoBoxA({
  profileImage,
  nickname,
  isFavorite,
  favoritesCount,
  experience,
  countCompleteMoving,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-6 lg:[92px]`}
    >
      <UserAvartar imgUrl={profileImage} />
      <div className="flex-1 flex flex-col justify-between h-[58px]">
        {/* 기사 이름 */}
        <div className="flex justify-between">
          <span className="text-[14px] lg:text-lg">{nickname} 기사님</span>
          <LikeCount isFavorite={isFavorite} favoritesCount={favoritesCount} />
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
  );
}

export default DriverInfoBoxA;
