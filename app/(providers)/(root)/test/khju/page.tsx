'use client';

import { useState } from 'react';
import DatePicker from '@/components/atoms/datepicker';
import EstimateDetailInfo from '@/components/organisms/EstimateDetailInfo';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';

function Page() {
  const mockEstimateData = {
    requestDate: new Date('2024-08-26'),
    serviceType: 'officeMove',
    movingDate: new Date('2024-08-26T10:00:00'),
    departure: '서울 중구 삼일대로 343',
    destination: '서울 강남구 선릉로 428',
  } as const;

  const mockCards = [
    {
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
  const itemsPerPage = 2; //요녀석 수정

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = mockCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockCards.length / itemsPerPage);

  return (
    <div>
      컴포넌트 테스트페이지입니다.
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

        <div className="w-full">
          <DatePicker />
        </div>
        <EstimateDetailInfo {...mockEstimateData} />
      </div>
    </div>
  );
}

export default Page;
