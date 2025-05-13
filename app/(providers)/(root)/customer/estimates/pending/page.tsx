'use client';

import { confirmEstimate, getPendingEstimate } from '@/api/estimate/customerOnly/estimate.api';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import { Estimate } from '@/types/entities/estimate.entity';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PendingEstimatesPage() {
  const router = useRouter();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // ✅ 상태 리프레시용 key

  // 데이터 요청
  useEffect(() => {
    async function fetchEstimates() {
      setIsLoading(true);
      try {
        const { estimates } = await getPendingEstimate(1, 10);
        setEstimates(estimates);
      } catch (error: unknown) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'isAxiosError' in error &&
          (error as AxiosError).isAxiosError
        ) {
          const axiosError = error as AxiosError<{ message: string }>;
          const status = axiosError.response?.status;
          const message = axiosError.response?.data?.message;

          if (
            status === 400 &&
            typeof message === 'string' &&
            message.includes('active Estimate Request not found')
          ) {
            setEstimates([]); // 빈 목록 처리
          } else {
            console.error('견적 목록을 불러오는 데 실패했습니다.', axiosError);
          }
        } else {
          console.error('예상치 못한 에러입니다.', error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchEstimates();
  }, [refreshKey]); // ✅ refreshKey 변경 시 다시 호출

  const unconfirmedEstimates = estimates.filter((e) => !e.isConfirmed); // ✅ 필터링

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size="md" />
        <p className="text-3xl mt-10">상세 견적 불러오는 중입니다...</p>
      </div>
    );
  }

  if (unconfirmedEstimates.length === 0) {
    return <EmptyListMessage message="대기중인 견적이 없습니다." />;
  }

  return (
    <div
      className="
        mx-auto
        mt-12
        w-[327px] md:w-[600px] lg:w-[1400px]
        grid grid-cols-1 lg:grid-cols-2 gap-4
      "
    >
      {unconfirmedEstimates.map((estimate) => (
        <WorkerCardInWating
          key={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.nickname}
          experience={estimate.experience}
          confirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={false}
          favoritesCount={estimate.favoritesCount}
          services={[estimate.serviceType]}
          isDirectEstimate={false}
          price={estimate.price || -1}
          status={estimate.status}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
          reviewsAverage={estimate.rating ?? 0}
          reviewsCount={estimate.reviewsCount}
          onConfirm={async () => {
            if (!estimate.price || estimate.price <= 0) {
              alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
              return;
            }

            try {
              await confirmEstimate(estimate.id);
              alert('견적이 확정되었습니다.');
              setRefreshKey((prev) => prev + 1); // ✅ 상태 갱신
            } catch (error) {
              alert('견적 확정에 실패했습니다.');
              console.error(error);
            }
          }}
          onViewDetail={() => {
            router.push(`/customer/estimates/pending/${estimate.id}`);
          }}
        />
      ))}
    </div>
  );
}
