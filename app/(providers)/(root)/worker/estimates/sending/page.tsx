<<<<<<< HEAD
import { getAccessTokenFromRefreshTest } from '@/utils/getAccessTokenTest';
import { getSentEstimatesServer } from '@/api/estimate/workerOnly/getSentEstimatesServer';
import SentEstimateList from '@/components/organisms/SentEstimateList';
import PaginationWrapper from '@/components/organisms/PaginationWrapper';
=======
'use client';


import { getSentEstimates } from '@/api/estimate/workerOnly/estimate.api';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import { Estimate } from '@/types/entities/estimate.entity';
import { useEffect, useState } from 'react';


function SendingEstimatesPage() {
  const router = useRouter();

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const safeDate = (date: Date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  useEffect(() => {
    async function fetchEstimates() {
      try {
        const { list, totalCount } = await getSentEstimates({
          page: 1,
          pageSize: 10,
        });
        setEstimates(list);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Failed to fetch estimates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEstimates();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (totalCount === 0) {
    return (
      <div className="text-center mt-12 text-gray-500">
        보낸 견적이 없습니다.
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        mt-12
        w-[327px] md:w-[600px] lg:w-[1400px]
        grid grid-cols-1 lg:grid-cols-2 gap-4
      "
    >
      <ul>
        {estimates.map((estimate) => (
          <CustomerCardInEstimate
            key={estimate.id}
            serviceType={estimate.serviceType}
            status={estimate.status}
            customerName={estimate.customerName}
            movingDate={new Date(estimate.movingDate)}
            departure={estimate.departure}
            destination={estimate.destination}
            isConfirmed={estimate.isConfirmed}
            requestDate={safeDate(estimate.requestDate)}
            price={estimate.price}
            onViewDetail={() => {
              router.push(`/worker/estimates/sending/${estimate.id}`);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
>>>>>>> parent of c4e73f9 ([정진호] chore: 스토리북 셋업)

const ITEMS_PER_PAGE = 4;

export default async function SentEstimatesPage({
  searchParams,
}: {
  searchParams: { page?: string | null };
}) {
  const page = Number(searchParams?.page ?? '1');
  const pageSize = ITEMS_PER_PAGE;

  const accessToken = await getAccessTokenFromRefreshTest();
  if (!accessToken) {
    return <div>로그인이 필요합니다</div>;
  }

  let data;
  try {
    data = await getSentEstimatesServer(page, pageSize, accessToken);
  } catch (e) {
    return <div>데이터 로드 실패</div>;
  }

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
      <SentEstimateList data={data.list} />
      <PaginationWrapper
        currentPage={page}
        totalPages={totalPages}
        className="mt-2"
      />
    </div>
  );
}
