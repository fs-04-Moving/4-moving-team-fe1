'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getRejectedEstimates } from '@/api/estimate/workerOnly/estimate.api';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';

const ITEMS_PER_PAGE = 4;

function RejectedEstimatesPage() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rejected-estimates', currentPage],
    queryFn: () =>
      getRejectedEstimates({ page: currentPage, pageSize: ITEMS_PER_PAGE }),
    enabled: !!user?.sub,
    staleTime: 1000 * 10,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorMessage />;

  const { list, totalCount } = data;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {list.length === 0 ? (
            <div className="text-gray-500 text-center mt-8">
              거절된 견적이 없습니다.
            </div>
          ) : (
            list.map((card) => (
              <div
                key={card.id}
                className="w-[328px] h-[192px] md:w-[600px] md:h-[164px] lg:w-[688px] lg:h-[216px]"
              >
                <CustomerCardInEstimate
                  id={card.id}
                  serviceType={card.serviceType}
                  status={card.status}
                  customerName={card.customerName}
                  movingDate={new Date(card.movingDate)}
                  departure={card.departure}
                  destination={card.destination}
                  isConfirmed={card.isConfirmed}
                  requestDate={new Date(card.requestDate)}
                  price={card.price}
                />
              </div>
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-2"
        />
      </div>
    </ProtectedPageWrapper>
  );
}

export default RejectedEstimatesPage;
