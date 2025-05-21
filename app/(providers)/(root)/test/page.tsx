'use client';

import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';

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
        isConfirmed={false}
        estimateRequestStatus={'confirmed'}
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
    </div>
  );
}

export default page;
