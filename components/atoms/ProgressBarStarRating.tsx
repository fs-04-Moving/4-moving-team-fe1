'use client';

import React from 'react';

interface ProgressBarStarRatingProps {
  ratings?: number[];
}

/**
 * 별점 프로그레스 바 컴포넌트입니다.
 *
 * @description
 * 별점 데이터 배열(ratings)을 기반으로 각 별점별 개수를 프로그레스 바로 보여줍니다.
 * 별점 데이터가 배열 형태로 제공되지 않거나 비어있을 경우(별점 못받았을때), 기본값은 0으로 설정해놨습니다.
 *
 * @param {object} props - 컴포넌트 props 객체입니다.
 * @param {Array<number>} props.ratings - 별점 데이터를 담고 있는 배열입니다. 각 요소는 해당 별점의 개수입니다.
 *
 * @example
 * // 별점 데이터 배열
 * <StarRatingProgressBar ratings={[10, 20, 30, 40, 50]} />
 *
 */

function ProgressBarStarRating({ ratings: ratingData }: ProgressBarStarRatingProps) {
  const defaultRatings = [0, 0, 0, 0, 0];

  const currentRatings =
    ratingData && Array.isArray(ratingData) && ratingData.length === 5
      ? ratingData
      : defaultRatings;

  const totalRatings = currentRatings.reduce((acc, val) => acc + val, 0);

  return (
    <div className="lg:h-[216px] lg:w-[510px] h-[176px] w-[327px] bg-BackGround-200 md:bg-BackGround-200 p-4 lg:g-[14px] rounded-2xl flex flex-col items-center justify-center">
      {[5, 4, 3, 2, 1].map((starValue, index) => (
        <div key={starValue} className="flex items-center g-[6px] lg: g-[14px] w-full">
          <p className="w-12 text-[14px] lg:text-[20px] text-black-400 font-bold">{`${starValue}점`}</p>
          <div className="w-[370px] bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-Secondary-Yellow-100 h-2.5 rounded-full"
              style={{
                width:
                  totalRatings > 0
                    ? `${(currentRatings[4 - index] / totalRatings) * 100}%`
                    : '0%',
              }}
            ></div>
          </div>
          <span className="w-12 text-left text-[14px] lg:text-[20px] text-gray-300 font-bold">
            {currentRatings[4 - index]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProgressBarStarRating;