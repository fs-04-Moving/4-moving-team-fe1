'use client'

import React, { useState, useEffect } from 'react';
import ButtonStarRating from '@/components/molecules/ButtonStarRating';
import ChartAverageReview from '@/components/atoms/ChartAverageReview';
import ProgressBarStarRating from '@/components/atoms/ProgressBarStarRating';

interface ChartStarRatingReviewProps{
  ratingData:number[];
}
/**
 * 별점카드 컴포넌트입니다.
 *
 * @description
 * 별점 데이터(ratingData)로 평균 별점과 각 별점 개수를 표시합니다. 
 * 사실상 여기에서 데이터를 가져와서 계산한다고 볼수 있음.
 *
 * @param {object} props.ratingDatas - 별점 데이터를 담고 있는 배열입니다. 별점(rating)과 해당 별점의 개수(count)를 나타냅니다.
 *
 *
 * @example
 * 데이터 예시는 테스트페이지에 표현해놨습니다.
 * <ChartStarRatingReview ratingDatas={ratingData} /> - 컴포넌트 사용 예시
 */


function ChartStarRatingReview({ ratingData }:ChartStarRatingReviewProps) {
  const [averageRating, setAverageRating] = useState(0);
  const calculateAverageRating = (data: { rating: number; count: number }[]) => {
    if (data && data.length > 0) {
      const totalRatings = data.reduce((acc, item) => acc + item.count, 0);
      if (totalRatings > 0) {
        const weightedSum = data.reduce((acc, item) => acc + item.rating * item.count, 0);
        return parseFloat((weightedSum / totalRatings).toFixed(1));
      }
    }
    return 0;
  };

  useEffect(() => {
    if (ratingData && ratingData.length === 5) {
      const convertedRatingData = ratingData.map((count, index) => ({
        rating: index + 1,
        count,
      }));
      setAverageRating(calculateAverageRating(convertedRatingData));
    } else {
      setAverageRating(0); // ratingData가 유효하지 않을 경우 0으로 설정
    }
  }, [ratingData]);
  return (
    <div className="lg:w-[955px] lg:h-[296px] md:h-[176px] md:w-[600px] lg:bg-BackGround-200 rounded-2xl flex items-center justify-center">
      <div className="lg:w-[837px] lg:h-[216px] flex flex-col lg:flex-row md:flex-row items-center justify-between">
        <div className="lg:w-[244px] lg:h-[139px] sm:p-b-[40px] md: p-[44.5px] flex flex-col items-center justify-center lg: gap-4">
          <ChartAverageReview ratingData={averageRating} />
          <ButtonStarRating initialRating={averageRating} disabled={true} starSize={60}/>
        </div>
        <ProgressBarStarRating ratings={ratingData} />
      </div>
    </div>
  );
}

export default ChartStarRatingReview;