'use client';

import { getSentEstimates } from '@/api/estimate/workerOnly/estimate.api';
import Pagination from '@/components/molecules/Pagination';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import { Estimate } from '@/types/entities/estimate.entity';
import { useEffect, useState } from 'react';

function ManageEstimatesWorker() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const { list, totalCount } = await getSentEstimates({
          page: currentPage,
          pageSize: itemsPerPage,
        });
        setEstimates(list);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (err) {
        console.error('견적 데이터를 불러오는 데 실패했어요', err);
      }
    };

    fetchEstimates();
  }, [currentPage]);

  const sortedCards = [...estimates].sort((a, b) => {
    const now = new Date();
    const aIsFuture = new Date(a.movingDate) > now;
    const bIsFuture = new Date(b.movingDate) > now;

    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;

    return new Date(a.movingDate).getTime() - new Date(b.movingDate).getTime();
  });

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
        {sortedCards.map((card) => (
          <div
            key={card.id}
            className="relative overflow-hidden
              w-[328px] h-[244px]
              md:w-[600px] md:h-[206px]
              lg:w-[688px] lg:h-[272px]"
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
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        className="mt-2"
      />
    </div>
  );
}

export default ManageEstimatesWorker;
