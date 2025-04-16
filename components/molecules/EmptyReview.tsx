import React from 'react';
import ImgEmptyReview from '@/assets/images/img-empty-review.svg';
import Image from 'next/image';

function EmptyReview() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[253px] h-[200px] flex flex-col items-center justify-center">
        <Image src={ImgEmptyReview} alt="리뷰없음" />
        <h1 className="mt-4 text-center">작성 가능한 리뷰가 없어요</h1>
      </div>
    </div>
  );
}

export default EmptyReview;
