import React from 'react';
import ImgEmptyReview from '@/assets/images/img-empty-review.svg';
import Image from 'next/image';

interface EmptyDataListProps {
  text: string;
}

function EmptyDataList({ text }: EmptyDataListProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[253px] h-[200px] flex flex-col items-center justify-center">
        <Image src={ImgEmptyReview} alt="목록 없음" />
        <h1 className="mt-4 text-center">{text}</h1>
      </div>
    </div>
  )
}

export default EmptyDataList;