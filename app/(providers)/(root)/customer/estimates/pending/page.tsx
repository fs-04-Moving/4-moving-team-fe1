'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmEstimate, getPendingEstimate } from '@/api/estimate/customerOnly/estimate.api';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import { useRouter } from 'next/navigation';

export default function PendingEstimatesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['pendingEstimates'],
    queryFn: () => getPendingEstimate(1, 10),
    select: (data) => data.estimates, // `estimates` 필드만 사용
  });

  const confirmMutation = useMutation({
    mutationFn: (estimateId: string) => confirmEstimate(estimateId),
    onSuccess: () => {
      alert('견적이 확정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['pendingEstimates'] });
    },
    onError: () => {
      alert('견적 확정에 실패했습니다.');
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>진행 중인 견적 요청이 없습니다.</div>;
  if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div className="mx-auto mt-12 w-[327px] md:w-[600px] lg:w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.map((estimate) => (
        <WorkerCardInWating
          key={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.nickname}
          experience={estimate.experience}
          confirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={false}
          favoritesCount={estimate.favoritesCount}
          services={[]}
          isDirectEstimate={false}
          price={estimate.price || 0}
          status={'general'}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
          reviewsAverage={0}
          reviewsCount={estimate.reviewsCount}
          onConfirm={() => {
            if (!estimate.price || estimate.price <= 0) {
              alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
              return;
            }
            confirmMutation.mutate(estimate.id);
          }}
          onViewDetail={() => {
            router.push(`/customer/estimates/pending/${estimate.id}`);
          }}
        />
      ))}
    </div>
  );
}
