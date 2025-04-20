'use client';

import { useState } from 'react';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';

import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';

function RejectedEstimatesPage() {
  const mockCards = [
    {
      //임시데이터입니당
      serviceType: 'smallMove',
      status: 'rejected',
      customerName: '김가나',
      movingDate: new Date('2024-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
    },
    {
      serviceType: 'smallMove',
      status: 'rejected',
      customerName: '김다라',
      movingDate: new Date('2024-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
    },
    {
      serviceType: 'smallMove',
      status: 'rejected',
      customerName: '김마바',
      movingDate: new Date('2024-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
    },
    {
      serviceType: 'smallMove',
      status: 'rejected',
      customerName: '김사아',
      movingDate: new Date('2024-07-01'),
      departure: '서울시 중구',
      destination: '경기도 수원시',
      isConfirmed: false,
      requestDate: new Date('2024-06-30'),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // -> Pagination 숫자 안정해서 추후 요녀석 수정

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = mockCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockCards.length / itemsPerPage);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {currentCards.map((card, index) => (
            <div
              key={index}
              className="w-[328px] h-[192px] md:w-[600px] md:h-[164px] lg:w-[688px] lg:h-[216px]"
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
    </ProtectedPageWrapper>
  );
}

export default RejectedEstimatesPage;
