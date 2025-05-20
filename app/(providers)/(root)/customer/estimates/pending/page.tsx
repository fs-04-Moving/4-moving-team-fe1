'use client';

import { confirmEstimate, getPendingEstimate } from '@/api/estimate/customerOnly/estimate.api';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import WorkerCardInWating from '@/components/organisms/WorkerCardInWating';
import Pagination from '@/components/molecules/Pagination'; // ✅ 추가
import ROUTES from '@/constants/routes';
import { Estimate } from '@/types/entities/estimate.entity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PAGE_SIZE = 10; // 페이지 당 항목 수

export default function PendingEstimatesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1); // ✅ 현재 페이지 상태

  const { data, isLoading, isError, error } = useQuery<
    { estimates: Estimate[]; totalCount: number },
    AxiosError
  >({
    queryKey: ['pending-estimates', currentPage],
    queryFn: () => getPendingEstimate(currentPage, PAGE_SIZE),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  const estimates = data?.estimates ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleConfirm = async (estimateId: string, price?: number) => {
    if (!price || price <= 0) {
      alert('아직 가격이 등록되지 않아 확정할 수 없습니다.');
      return;
    }

    try {
      await confirmEstimate(estimateId);
      alert('견적이 확정되었습니다.');
      await queryClient.invalidateQueries({ queryKey: ['pending-estimates'] });
    } catch (err) {
      alert('견적 확정에 실패했습니다.');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size="md" />
        <p className="text-3xl mt-10">상세 견적 불러오는 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    console.error('에러 발생:', error);
    return (
      <div className="w-full flex justify-center items-center mt-[50px] min-h-[370px]">
        <EmptyListMessage message="견적을 불러오는 데 실패했습니다." />
      </div>
    );
  }

  return (
    <div className="bg-BackGround-200 min-h-full ">
      <div className="p-8 lg:p-10 bg-BackGround-200"></div>
      <div
        className="
          mx-auto
          w-[327px] md:w-[600px] lg:w-[1400px]
          grid grid-cols-1 lg:grid-cols-2 
          gap-x-6 
          gap-y-8 lg:gap-y-12
        "
      >
        {estimates.map((estimate) => (
          <WorkerCardInWating
            key={estimate.id}
            profileImage={estimate.profileImage}
            nickname={estimate.nickname}
            experience={estimate.experience}
            confirmedEstimatesCount={estimate.confirmedEstimatesCount}
            isFavorite={estimate.isFavorite ?? false}
            favoritesCount={estimate.favoritesCount}
            services={[estimate.serviceType]}
            isDirectEstimate={estimate.status === 'assigned'}
            price={estimate.price || 0}
            status={estimate.status}
            movingDate={estimate.movingDate}
            departure={estimate.departure}
            destination={estimate.destination}
            reviewsAverage={estimate.rating ?? 0}
            reviewsCount={estimate.reviewsCount}
            onConfirm={() => handleConfirm(estimate.id, estimate.price)}
            onViewDetail={() => {
              router.push(ROUTES.CUSTOMER.ESTIMATES.DETAIL(estimate.id));
            }}
          />
        ))}
      </div>

      {/* ✅ 페이지네이션 컴포넌트 추가 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-12 mb-6"
      />
    </div>
  );
}
