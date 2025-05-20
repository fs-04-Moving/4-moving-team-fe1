'use client';
import LeftMenuInWorkerPage from '@/app/(providers)/(root)/worker/_components/LeftMenuInWorkerPage';
import TopMemuInWorkerPage from '@/app/(providers)/(root)/worker/_components/TopMemuInWorkerPage';
import { useReceivedRequestsQuery } from '@/hooks/useReceivedRequestsQuery';
import { ReceivedEstimateRequestSearchParams } from '@/types/dtos/estimateRequest.dto';
import { EstimateRequest } from '@/types/entities/estimateRequest.entity';
import { ServiceType } from '@/types/move.type';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import CustomerCardInEstimate from '../organisms/CustomerCardInEstimate';
import ResponsiveModal from './ResponsiveModal';
import EstimateSend from './EstimateSend';
import EstimateRejectSend from './EstimateRejectSend';
import { useInView } from 'react-intersection-observer';
import CheckModalRoot from './CheckModalRoot';
import EmptyListMessage from '../molecules/EmptyListMessage';

export interface ReceivedEstimateRequest extends EstimateRequest {
  customerId: string;
  customerName: string;
  price: number;
  estimateId: string | null;
  createdAt: Date;
}

function ReceivedRequests() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams: ReceivedEstimateRequestSearchParams = useMemo(() => {
    const page = 1;
    const pageSize = 3;
    const serviceType = (searchParams.get('serviceType') as ServiceType) || undefined;
    const filter = searchParams.get('filter') || undefined;
    const orderBy = searchParams.get('orderBy') || undefined;
    const search = searchParams.get('search') || undefined;

    return { page, pageSize, filter, orderBy, serviceType, search };
  }, [searchParams]);

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useReceivedRequestsQuery(queryParams);

  const [requestEstimate, setRequestEstimate] = useState<ReceivedEstimateRequest | null>(null);

  // 모달 관련 //
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openEstimateModal = (request: ReceivedEstimateRequest) => {
    setRequestEstimate(request);
    setIsEstimateModalOpen(true);
  };
  const closeEstimateModal = () => setIsEstimateModalOpen(false);

  const openRejectModal = (request: ReceivedEstimateRequest) => {
    setRequestEstimate(request);
    setIsRejectModalOpen(true);
  };
  const closeRejectModal = () => setIsRejectModalOpen(false);

  useEffect(() => {
    router.replace(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCount = data?.pages?.[0]?.totalCount;

  const [pageData, setPageData] = useState({
    smallMove: 0,
    officeMove: 0,
    homeMove: 0,
    serviceAreaCount: 0,
    assignedCount: 0,
  });

  useEffect(() => {
    if (data?.pages?.[0]) {
      const page0 = data.pages[0];
      setPageData({
        smallMove: page0.smallMove,
        officeMove: page0.officeMove,
        homeMove: page0.homeMove,
        serviceAreaCount: page0.serviceAreaCount,
        assignedCount: page0.assignedCount,
      });
    }
    // else: data 없으면 기존 pageData 유지!
  }, [data]);

  return (
    <main>
      <div className=" flex justify-center">
        <h2 className="font-semibold text-2xl py-8 lg:w-[1400px] md:w-[600px] w-[327px]">
          받은 요청
        </h2>
      </div>
      <div className="flex justify-center gap-28">
        <LeftMenuInWorkerPage {...pageData} />
        <section className="w-[327px] md:w-[600px] lg:w-[955px] flex flex-col gap-[32px]">
          <TopMemuInWorkerPage
            totalCount={totalCount}
            openModal={() => setIsFilterModalOpen(true)}
          />
          <div className="flex flex-col gap-12">
            {isLoading && <div>Loading…</div>}

            {!isLoading && data && data.pages.flatMap((p) => p.list).length === 0 && (
              <EmptyListMessage message="아직 받은 요청이 없어요!" />
            )}

            {data &&
              data.pages
                .flatMap((p) => p.list)
                .map((request: ReceivedEstimateRequest) => (
                  <CustomerCardInEstimate
                    key={request.id}
                    serviceType={request.serviceType}
                    status={request.status}
                    customerName={request.customerName}
                    movingDate={new Date(request.movingDate)}
                    departure={request.departure}
                    destination={request.destination}
                    isConfirmed={false}
                    requestDate={new Date(request.createdAt)}
                    price={request.price}
                    onSendEstimate={() => openEstimateModal(request)}
                    onReject={() => openRejectModal(request)}
                    onViewDetail={() => console.log('상세보기')}
                  />
                ))}

            <div style={{ height: 1 }} ref={ref}></div>

            {isFetchingNextPage && <div className="text-center py-4">Loading more…</div>}
          </div>
        </section>
      </div>
      <ResponsiveModal width="lg:w-[608px] md:w-[375px] " isOpen={isEstimateModalOpen}>
        <EstimateSend onClose={closeEstimateModal} request={requestEstimate} />
      </ResponsiveModal>

      <ResponsiveModal width="md:w-[375px] lg:w-[608px]" isOpen={isRejectModalOpen}>
        <EstimateRejectSend onClose={closeRejectModal} request={requestEstimate} />
      </ResponsiveModal>

      <ResponsiveModal width="w-[375px]" isOpen={isFilterModalOpen}>
        <CheckModalRoot
          closeModal={() => {
            setIsFilterModalOpen(false);
          }}
          {...pageData}
        />
      </ResponsiveModal>
    </main>
  );
}

export default ReceivedRequests;
