'use client';

import React from 'react';

/**
 * 별점 분포 프로그레스 바 컴포넌트입니다.
 *
 * @description
 * 주어진 별점 데이터 배열(`ratings`)을 기반으로 각 별점별 개수를 프로그레스 바로 보여줍니다.
 * 별점 데이터가 배열 형태로 제공되지 않거나 비어있을 경우(별점 못받았을때), 기본값은 0으로 설정해놨습니다. 
 *
 * @param {object} props - 컴포넌트 props 객체입니다.
 * @param {Array<{rating: number, count: number}>} props.ratings - 별점 데이터를 담고 있는 배열입니다. 각 요소는 별점(rating)과 해당 별점의 개수(count)입니다.
 *
 * @example
 * // 별점 데이터 배열
 * <StarRatingProgressBar ratings={[{ rating: 1, count: 10 }, { rating: 2, count: 20 }, { rating: 3, count: 30 }, { rating: 4, count: 40 }, { rating: 5, count: 50 }]} />
 *
 */

function StarRatingProgressBar({ ratings: ratingData }) {
  const defaultRatings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const currentRatings = ratingData && Array.isArray(ratingData) && ratingData.length > 0
    ? ratingData.reduce((acc, item) => ({ ...acc, [item.rating]: item.count }), {})
    : defaultRatings;

  const totalRatings = Object.values(currentRatings).reduce((acc, val) => acc + val, 0);

  return (
    <div className="lg:bg-none sm:bg-BackGround-200 p-4 m-4 sm:rounded-2xl flex flex-col items-center justify-center">
      {[5, 4, 3, 2, 1].map((starValue) => (
        <div key={starValue} className="flex items-center w-full mb-4">
          <p className="w-12 text-[14px] lg:text-[20px] text-black-400 font-bold">{`${starValue}점`}</p>
          <div className="w-[370px] bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-Secondary-Yellow-100 h-2.5 rounded-full"
              style={{
                width: totalRatings > 0 ? `${(currentRatings[starValue] / totalRatings) * 100}%` : '0%',
              }}
            ></div>
          </div>
          <span className="w-12 text-left text-[14px] lg:text-[20px] text-gray-300 font-bold">{currentRatings[starValue]}</span>
        </div>
      ))}
    </div>
  );
}

export default StarRatingProgressBar;