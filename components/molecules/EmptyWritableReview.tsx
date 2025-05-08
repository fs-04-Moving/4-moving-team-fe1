import React from 'react';
import ImgEmptyReview from '@/assets/images/img-empty-review.svg';
import Image from 'next/image';

interface EmptyDataListProps {
  text: string;
}

function EmptyDataList({ text }: EmptyDataListProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[165px] h-[132px] lg:w-[300px] lg:h-[136px] flex flex-col items-center justify-center">
        <Image src={ImgEmptyReview} alt="목록 없음" />
        <h1 className="mt-6 mb-6 lg:mt-8 mb-8 text-center text-gray-400 text-[12px] lg:text-[24px]">{text}</h1>
      </div>
    </div>
  )
}

export default EmptyDataList;