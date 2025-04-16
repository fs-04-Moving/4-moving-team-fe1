'use client';

import { useState } from 'react';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';

function ManageEstimatesWorker() {
  const mockCards = [
    {
      serviceType: 'smallMove',
      status: 'assigned',
      customerName: '김가나',
      movingDate: new Date('2024-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
      price: 1000000,
    },
    {
      serviceType: 'smallMove',
      status: 'assigned',
      customerName: '김다라',
      movingDate: new Date('2023-06-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-05-30'),
      price: 458470,
    },
    {
      serviceType: 'smallMove',
      status: 'assigned',
      customerName: '김마바',
      movingDate: new Date('2024-10-10'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
      price: 300000,
    },
    {
      serviceType: 'smallMove',
      status: 'assigned',
      customerName: '김사아',
      movingDate: new Date('2025-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
      price: 200000,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const sortedCards = [...mockCards].sort((a, b) => {
    const now = new Date();
    const aIsFuture = a.movingDate > now;
    const bIsFuture = b.movingDate > now;

    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;

    return a.movingDate.getTime() - b.movingDate.getTime();
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = sortedCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCards.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden
              w-[328px] h-[244px]
              md:w-[600px] md:h-[206px]
              lg:w-[688px] lg:h-[272px]"
          >
            <CustomerCardInEstimate {...card} />
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
