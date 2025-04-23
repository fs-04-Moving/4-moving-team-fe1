'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import Pagination from '@/components/molecules/Pagination';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';

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
};

type RejectEstimatesResponse = {
  estimates: Estimate[];
  totalCount: number;
};

const getRejectEstimates = async (
  page: number,
  pageSize: number
): Promise<RejectEstimatesResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/estimate/reject`,
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

function RejectedEstimatesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery<RejectEstimatesResponse, Error>(
    {
      queryKey: ['rejectEstimates', currentPage],
      queryFn: () => getRejectEstimates(currentPage, ITEMS_PER_PAGE),
    }
  );

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !data || !data.estimates) return <div>오류가 발생했어요.</div>;

  const totalPages = Math.ceil(data.totalCount / ITEMS_PER_PAGE);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {data.estimates.map((card, index) => (
            <div
              key={index}
              className="w-[328px] h-[192px] md:w-[600px] md:h-[164px] lg:w-[688px] lg:h-[216px]"
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
    </ProtectedPageWrapper>
  );
}

export default RejectedEstimatesPage;
