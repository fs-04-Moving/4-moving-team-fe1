'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';

const ITEMS_PER_PAGE = 4;

type Estimate = {
  serviceType: string;
  status: string;
  customerName: string;
  movingDate: string;
  departure: string;
  destination: string;
  isConfirmed: boolean;
  requestDate: string;
  price: number;
};

type SentEstimatesResponse = {
  estimates: Estimate[];
  totalCount: number;
};

const getSentEstimates = async (
  page: number,
  pageSize: number
): Promise<SentEstimatesResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/estimate/sent`,
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

  return res.data;
};

function SendingEstimatesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery<SentEstimatesResponse, Error>({
    queryKey: ['sentEstimates', currentPage],
    queryFn: () => getSentEstimates(currentPage, ITEMS_PER_PAGE),
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !data || !data.estimates) return <div>오류가 발생했어요.</div>;

  const sortedCards = [...data.estimates].sort((a, b) => {
    const now = new Date();
    const aDate = new Date(a.movingDate);
    const bDate = new Date(b.movingDate);
    const aIsFuture = aDate > now;
    const bIsFuture = bDate > now;

    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;

    return aDate.getTime() - bDate.getTime();
  });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCards = sortedCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.totalCount / ITEMS_PER_PAGE);

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
            <CustomerCardInEstimate
              {...card}
              movingDate={new Date(card.movingDate)}
              requestDate={new Date(card.requestDate)}
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

export default SendingEstimatesPage;
