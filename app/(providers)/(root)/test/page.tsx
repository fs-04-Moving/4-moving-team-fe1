'use client';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import React from 'react';

function page() {
  return (
    <div>
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
        departure="서울시 중구 나하대로12 203"
        destination="경기도 수원시 오도대로34 204, 206호"
        onConfirm={() => console.log('견적 확정하기 클릭')}
        onViewDetail={() => console.log('상세 보기 클릭')}
        reviewsAverage={4.7}
        reviewsCount={108}
      />

      <CustomerCardInEstimate
        serviceType="smallMove"
        status="assigned"
        customerName="김인서"
        movingDate={new Date('2024-07-01')}
        departure="서울시 중구 나하대로12 203"
        destination="경기도 수원시 오도대로34 204, 206호"
        isConfirmed={false}
        requestDate={new Date('2024-06-30')}
        price={210000}
      />
    </div>
  );
}

export default page;
