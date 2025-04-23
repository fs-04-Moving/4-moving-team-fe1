import { cookies } from 'next/headers';
import axios from 'axios';

import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import PaginationWrapper from '@/components/organisms/PaginationWrapper';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import { getAccessTokenFromRefresh } from '@/utils/jwtUtils';

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
  list: Estimate[];
  totalCount: number;
};

async function getRejectEstimatesSSR(
  page: number,
  pageSize: number,
  accessToken: string
): Promise<RejectEstimatesResponse> {
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
}

export default async function RejectedEstimatesPage({
  searchParams,
}: {
  searchParams: { page?: string | null };
}) {
  const page = Number(searchParams?.page ?? '1');
  const pageSize = ITEMS_PER_PAGE;

  let accessToken = await getAccessTokenFromRefresh();
  if (!accessToken) return <div>🔐 로그인 필요</div>;

  let data: RejectEstimatesResponse;
  try {
    data = await getRejectEstimatesSSR(page, pageSize, accessToken);
  } catch (e) {
    console.error('데이터 로드 실패', e);
    return <div>데이터 로드 실패</div>;
  }

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {data.list.map((card, index) => (
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

        <PaginationWrapper
          currentPage={page}
          totalPages={totalPages}
          className="mt-2"
        />
      </div>
    </ProtectedPageWrapper>
  );
}
