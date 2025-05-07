"use client";
import LeftMenuInWorkerPage from "@/app/(providers)/(root)/worker/_components/LeftMenuInWorkerPage";
import TopMemuInWorkerPage from "@/app/(providers)/(root)/worker/_components/TopMemuInWorkerPage";
import { useReceivedRequestsQuery } from "@/hooks/useReceivedRequestsQuery";
import { ReceivedEstimateRequestSearchParams } from "@/types/dtos/estimateRequest.dto";
import { EstimateRequest } from "@/types/entities/estimateRequest.entity";
import { ServiceType } from "@/types/move.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CustomerCardInEstimate from "../organisms/CustomerCardInEstimate";
import ResponsiveModal from "./ResponsiveModal";
import EstimateSend from "./EstimateSend";

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
    const serviceType =
      (searchParams.get("serviceType") as ServiceType) || undefined;
    const filter = searchParams.get("filter") || undefined;
    const orderBy = searchParams.get("orderBy") || undefined;
    const search = searchParams.get("search") || undefined;

    return { page, pageSize, filter, orderBy, serviceType, search };
  }, [searchParams]);

  const { data } = useReceivedRequestsQuery(queryParams);

  const [requestEstimate, setRequestEstimate] =
    useState<ReceivedEstimateRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (request: ReceivedEstimateRequest) => {
    setRequestEstimate(request);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    router.replace(window.location.pathname);
  }, [router]);

  const totalCount = data?.pages?.[0]?.totalCount;

  return (
    <main>
      <div className=" flex justify-center">
        <h2 className="font-semibold text-2xl py-8 lg:w-[1400px] md:w-[600px] w-[327px]">
          받은 요청
        </h2>
      </div>
      <div className="flex justify-center gap-28">
        <LeftMenuInWorkerPage />
        <section className="w-[327px] md:w-[600px] lg:w-[955px] flex flex-col gap-[32px]">
          <TopMemuInWorkerPage totalCount={totalCount} />
          <div className="flex flex-col gap-12">
            {data?.pages.flatMap((page) => {
              return page.list.map((request: ReceivedEstimateRequest) => (
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
                  onSendEstimate={() => openModal(request)}
                  onReject={() => console.log("반려")}
                  onViewDetail={() => console.log("상세보기")}
                />
              ));
            })}
          </div>

          {/* <div ref={ref}></div>  나중에 무한 스크롤 */}
        </section>
      </div>
      <ResponsiveModal
        width="w-full sm:w-[608px]"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <EstimateSend onClose={closeModal} request={requestEstimate} />
      </ResponsiveModal>
    </main>
  );
}

export default ReceivedRequests;
