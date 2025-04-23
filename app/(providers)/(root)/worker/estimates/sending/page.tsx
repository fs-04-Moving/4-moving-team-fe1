import axios from 'axios';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import PaginationWrapper from '@/components/organisms/PaginationWrapper';
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
  price: number;
};

type SentEstimatesResponse = {
  list: Estimate[];
  totalCount: number;
};

async function getSentEstimatesSSR(
  page: number,
  pageSize: number,
  accessToken: string
): Promise<SentEstimatesResponse> {
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
}

export default async function SendingEstimatesPage({
  searchParams,
}: {
  searchParams: { page?: string | null };
}) {
  const page = Number(searchParams?.page ?? '1');
  const pageSize = ITEMS_PER_PAGE;

  // ✅ accessToken 없으면 refreshToken으로 재발급
  let accessToken = await getAccessTokenFromRefresh();
  if (!accessToken) {
    return <div>로그인 필요</div>;
  }

  let data: SentEstimatesResponse;
  try {
    data = await getSentEstimatesSSR(page, pageSize, accessToken);
  } catch (e) {
    console.error('데이터 로드 실패', e);
    return <div>데이터 로드 실패</div>;
  }

  const sortedCards = [...data.list].sort((a, b) => {
    const now = new Date();
    const aDate = new Date(a.movingDate);
    const bDate = new Date(b.movingDate);
    const aIsFuture = aDate > now;
    const bIsFuture = bDate > now;
    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;
    return aDate.getTime() - bDate.getTime();
  });

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentCards = sortedCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {currentCards.map((card, index) => (
            <div
              key={index}
              className="relative overflow-hidden w-[328px] h-[244px] md:w-[600px] md:h-[206px] lg:w-[688px] lg:h-[272px]"
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
