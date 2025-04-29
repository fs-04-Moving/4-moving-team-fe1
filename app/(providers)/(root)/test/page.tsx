'use client';

import WorkerCardInCompletedReview from '@/components/organisms/WorkerCardInCompletedReview';
import WorkerCardInEstimate from '@/components/organisms/WorkerCardInEstimate';
import WorkerCardInLiked from '@/components/organisms/WorkerCardInLiked';
import WorkerCardInPendingReview from '@/components/organisms/WorkerCardInPendingReview';
import WorkerCardInProfile from '@/components/organisms/WorkerCardInProfile';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import WorkerCardInWritableReview from '@/components/organisms/WorkerCardInWritableReview';
import React from 'react';

function page() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <WorkerCardInWritableReview
        serviceType="smallMove"
        profileImage="/img/sample.jpg"
        nickname="김이사"
        movingDate={new Date('2024-07-01')}
        price={210000}
        isReviewWritten={false}
        onClickWriteReview={() => console.log(true)}
      />
      <WorkerCardInWating
        profileImage="/images/driver1.png"
        nickname="김이사"
        experience={8}
        confirmedEstimatesCount={342}
        isFavorite={true}
        favoritesCount={128}
        services={['smallMove', 'homeMove']}
        isDirectEstimate={true}
        price={210000}
        status="general" // 실제 Enum 값으로 대체 필요
        movingDate={new Date('2024-07-01')}
        departure="서울시 중구"
        destination="경기도 수원시"
        onConfirm={() => console.log('견적 확정하기 클릭')}
        onViewDetail={() => console.log('상세 보기 클릭')}
        reviewsAverage={4.7}
        reviewsCount={108}
      />
      <WorkerCardInProfile
        profileImage="/images/sample.jpg"
        nickname="김이사"
        experience={8}
        confirmedEstimatesCount={120}
        summary="빠르고 꼼꼼한 기사입니다."
        serviceAreas={['seoul', 'incheon']}
        services={['smallMove', 'homeMove']}
        onConfirm={() => console.log('프로필 수정')}
        onViewDetail={() => console.log('기본 정보 수정')}
        reviewsAverage={4.7}
        reviewsCount={108}
      />
      <WorkerCardInPendingReview
        profileImage="/images/sample.jpg"
        nickname="김코드"
        experience={7}
        confirmedEstimatesCount={334}
        isFavorite={true}
        favoritesCount={136}
        services={['smallMove', 'homeMove']}
        reviewsAverage={4.7}
        reviewsCount={108}
      />
      <WorkerCardInLiked
        profileImage="/images/sample.jpg"
        nickname="김코드"
        experience={7}
        confirmedEstimatesCount={334}
        isFavorite={true}
        favoritesCount={136}
        services={['smallMove', 'homeMove']}
        reviewsAverage={4.7}
        reviewsCount={108}
      />
      <WorkerCardInCompletedReview
        serviceType="homeMove"
        profileImage="/img/profile.png"
        nickname="김이사"
        movingDate={new Date('2024-06-01')}
        price={210000}
        content="친절하고 꼼꼼하게 이사해주셨어요."
        createdAt={new Date('2024-06-02')}
        rating={4.2}
      />
      <WorkerCardInEstimate
        profileImage="/images/sample.jpg"
        nickname="김코드"
        experience={7}
        summary="안전하고 깔끔한 이사 도와드립니다."
        confirmedEstimatesCount={334}
        isFavorite={true}
        favoritesCount={136}
        services={['smallMove', 'homeMove']}
        isDirectEstimate={true}
        price={1800000}
        reviewsAverage={4.7}
        reviewsCount={108}
      />
    </div>
  );
}

export default page;
