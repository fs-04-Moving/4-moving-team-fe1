'use client';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';

function page() {
  return (
    <div>
      <CustomerCardInEstimate
        serviceType="smallMove"
        status="assigned"
        customerName="김인서"
        movingDate={new Date('2024-07-01')}
        departure="서울시 중구"
        destination="경기도 수원시"
        isConfirmed={false}
        requestDate={new Date('2024-06-30')}
        price={undefined}
        onSendEstimate={() => console.log('견적 보내기')}
        onReject={() => console.log('반려')}
        onViewDetail={() => console.log('상세보기')}
        rejectionMessage={'반려시 작성한 메시지'}
      />
    </div>
  );
}

export default page;
