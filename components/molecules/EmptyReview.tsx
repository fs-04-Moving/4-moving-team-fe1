import React from 'react';
import ImgEmptyReview from '@/assets/images/img-empty-review.svg';
import Image from 'next/image';
import ButtonSolid from '../atoms/ButtonSolid';
import Link from 'next/link';

function EmptyReview() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[110px] h-[82px] lg:w-[185px] lg:h-[136px]">
          <Image src={ImgEmptyReview} alt="리뷰없음" layout="responsive" />
        </div>
        <h1 className="mt-6 mb-6 lg:mt-8 lg:mb-8 text-center text-gray-400 text-[12px] lg:text-[24px] ">아직 등록된 리뷰가 없어요</h1>
        <Link href="/customer/reviews/pending" passHref>
          <div className="w-[151px] h-[54px] lg:w-[180px] lg:h-[64px] ">
            <ButtonSolid className="w-full h-full flex items-center justify-center text-[16px] lg:text-[20px]">
              리뷰 작성하러 가기
            </ButtonSolid>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EmptyReview;