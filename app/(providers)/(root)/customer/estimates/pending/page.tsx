'use client';

import { confirmEstimate, getPendingEstimate } from '@/api/estimate/customerOnly/estimate.api';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import { Estimate } from '@/types/entities/estimate.entity';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PendingEstimatesPage() {
  const router = useRouter();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    async function fetchEstimates() {
      try {
        const { estimates } = await getPendingEstimate(1, 10);
        setEstimates(estimates);
      } catch (error) {
        console.error('견적 목록을 불러오는 데 실패했습니다.', error);
      } finally {
        setIsLoading(false); // ✅ 로딩 종료
      }
    }

    fetchEstimates();
  }, []);

  return (
    <div
      className="
        mx-auto
        mt-12
        w-[327px] md:w-[600px] lg:w-[1400px]
        grid grid-cols-1 lg:grid-cols-2 gap-4
      "
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="md" />
          <p className="text-3xl mt-10">대기중인 견적 불러오는 중입니다...</p>
        </div>
      ) : estimates.length === 0 ? (
        <EmptyListMessage message={'대기중인 견적이 없습니다.'} />
      ) : (
        estimates.map((estimate) => (
          <WorkerCardInWating
            key={estimate.id}
            profileImage={estimate.profileImage}
            nickname={estimate.nickname}
            experience={estimate.experience}
            confirmedEstimatesCount={estimate.confirmedEstimatesCount}
            isFavorite={false}
            favoritesCount={estimate.favoritesCount}
            services={[estimate.serviceType]} // ✅ 이렇게 배열로 감싸기
            isDirectEstimate={false}
            price={estimate.price || 0}
            status={'general'}
            movingDate={estimate.movingDate}
            departure={estimate.departure}
            destination={estimate.destination}
            reviewsAverage={3.3} //??
            reviewsCount={estimate.reviewsCount}
            onConfirm={async () => {
              if (!estimate.price || estimate.price <= 0) {
                alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
                return;
              }

              try {
                await confirmEstimate(estimate.id);
                alert('견적이 확정되었습니다.');
                setIsLoading(true);
                const { estimates } = await getPendingEstimate(1, 10);
                setEstimates(estimates);
              } catch (error) {
                alert('견적 확정에 실패했습니다.');
                console.error(error);
              } finally {
                setIsLoading(false);
              }
            }}
            onViewDetail={() => {
              router.push(`/customer/estimates/pending/${estimate.id}`);
            }}
          />
        ))
      )}
    </div>
  );
}
