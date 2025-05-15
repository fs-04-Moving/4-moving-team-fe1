'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/molecules/Pagination';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import CustomerCardInEstimateModal from '@/components/organisms/CustomerCardInEstimateModal';
import { Estimate } from '@/types/entities/estimate.entity';
import { getRejectedEstimates } from '@/api/estimate/workerOnly/estimate.api';
import EmptyListMessage from '@/components/molecules/EmptyListMessage';
import ROUTES from '@/constants/routes';

const ITEMS_PER_PAGE = 4;

export default function RejectedEstimatesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const { list, totalCount } = await getRejectedEstimates({
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
        });

        const parsedList = list.map((item) => ({
          ...item,
          movingDate: isNaN(new Date(item.movingDate).getTime())
            ? new Date(0)
            : new Date(item.movingDate),
          requestDate: isNaN(new Date(item.requestDate).getTime())
            ? new Date(0)
            : new Date(item.requestDate),
        }));

        setEstimates(parsedList);
        setTotalCount(totalCount);
      } catch (err) {
        console.error('반려 견적 데이터를 불러오는 데 실패했어요', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading) return <div className="text-center mt-12">로딩 중...</div>;

  return (
    <ProtectedPageWrapper>
      <div className="bg-[#FAFAFA] min-h-screen w-full pt-10 flex flex-col items-center gap-[24px] md:gap-[32px] lg:gap-[48px]">
        <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center bg-[#FAFAFA]">
          {estimates.length === 0 ? (
            <EmptyListMessage
              message="반려된 견적이 없습니다."
              isUsingButton={true}
              buttonText="받은 요청 목록 보기"
              buttonLink="/worker"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[32px] lg:gap-[48px] w-full max-w-[1400px] justify-items-center">
              {estimates.map((card) => (
                <div key={card.id} className="w-[328px] md:w-[600px] lg:w-[688px]">
                  <CustomerCardInEstimateModal
                    serviceType={card.serviceType}
                    status={card.status}
                    customerName={card.customerName}
                    movingDate={card.movingDate}
                    departure={card.departure.split(' ').slice(0, 2).join(' ')}
                    destination={card.destination.split(' ').slice(0, 2).join(' ')}
                    isConfirmed={card.isConfirmed}
                    price={card.price}
                    onViewDetail={() => {
                      router.push(ROUTES.WORKER.ESTIMATES.DETAIL(card.id));
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {estimates.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-2"
            />
          )}
        </div>
      </div>
    </ProtectedPageWrapper>
  );
}
