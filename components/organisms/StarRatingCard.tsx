'use client'

import React, { useState, useEffect } from 'react';
import StarRating from '@/components/molecules/StarLating';
import AverageRating from '@/components/atoms/AverageRating';
import StarRatingProgressBar from '@/components/atoms/StarRatingProgressBar';

/**
 * 별점카드 컴포넌트입니다.
 *
 * @description
 * 별점 데이터(ratingData)로 평균 별점과 각 별점 개수를 표시합니다
 *
 * @param {object} props.ratingDatas - 별점 데이터를 담고 있는 배열입니다. 별점(rating)과 해당 별점의 개수(count)를 나타냅니다.
 *
 *
 * @example
 * 데이터 예시는 테스트페이지에 표현해놨습니다.
 * <StarRatingCard ratingDatas={ratingData} /> - 컴포넌트 사용 예시
 */


function StarRatingCard({ ratingData }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (ratingData && ratingData.length > 0) {
      const totalRatings = ratingData.reduce((acc, item) => acc + item.count, 0);
      if (totalRatings > 0) {
        const weightedSum = ratingData.reduce((acc, item) => acc + item.rating * item.count, 0);
        setAverageRating(parseFloat((weightedSum / totalRatings).toFixed(1)));
      } else {
        setAverageRating(0);
      }
    }
  }, [ratingData]);

  return (
    <div className="lg:w-[955px] lg:h-[296px] lg:bg-BackGround-200 sm:bg-transparent rounded-2xl flex items-center justify-center ">
      <div className="lg:w-[837px] lg: h-[216px] flex flex-col lg:flex-row  items-center justify-between">
        <div className="lg:w-[244px] lg: h-[139px] sm:m-b-[40px] flex flex-col items-center justify-center lg: gap-4  ">
          <AverageRating ratingData={averageRating} />
          <StarRating initialRating={averageRating} disabled={true} />
        </div>
        <StarRatingProgressBar ratings={ratingData} />
      </div>
    </div>
  );
}

export default StarRatingCard;