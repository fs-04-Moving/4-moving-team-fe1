"use client";
import LeftMenuInWorkerPage from "@/app/(providers)/(root)/worker/_components/LeftMenuInWorkerPage";
import TopMemuInWorkerPage from "@/app/(providers)/(root)/worker/_components/TopMemuInWorkerPage";
import CustomerCardInEstimate from "../organisms/CustomerCardInEstimate";
import { useReceivedRequestsQuery } from "@/hooks/useReceivedRequestsQuery";
import { ReceivedEstimateRequestSearchParams } from "@/types/dtos/estimateRequest.dto";
import { EstimateRequest } from "@/types/entities/estimateRequest.entity";
import { useEffect } from "react";

const tempParams: ReceivedEstimateRequestSearchParams = {
  page: 1,
  pageSize: 3,
  serviceType: undefined,
  orderBy: undefined,
  search: undefined,
  filter: undefined,
};

export interface ReceivedEstimateRequest extends EstimateRequest {
  customerId: string;
  customerName: string;
  price: number;
  estimateId: string | null;
  createdAt: Date;
}

function ReceivedRequests() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useReceivedRequestsQuery(tempParams);

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
                  onSendEstimate={() => console.log("견적 보내기")}
                  onReject={() => console.log("반려")}
                  onViewDetail={() => console.log("상세보기")}
                />
              ));
            })}
          </div>

          {/* <div ref={ref}></div>  나중에 무한 스크롤 */}
        </section>
      </div>
    </main>
  );
}

export default ReceivedRequests;
