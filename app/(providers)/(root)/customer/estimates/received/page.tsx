"use client";

import estimateRequestApi from "@/api/estimate-request/estimateRequest.api";
import EstimateDetailInfo from "@/components/organisms/EstimateDetailInfo";
import { InactiveEstimateRequest } from "@/types/dtos/estimateRequest.dto";
import { useEffect, useState } from "react";
import EstimateCardList from "./(components)/EstimateCardList";

function ReceivedPage() {
  const [requests, setRequests] = useState<InactiveEstimateRequest[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchInactiveRequests = async () => {
      try {
        const response = await estimateRequestApi.getInactiveEstimateRequests({
          page: 1,
          pageSize: 10,
        });
        setRequests(response.list);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("견적 요청 목록 조회 실패", error);
      }
    };

    fetchInactiveRequests();
  }, []);

  return (
    <div
      className="
    mx-auto
    mt-12
    w-[327px] md:w-[600px] lg:w-[1400px]
    grid grid-cols-1 lg:grid-cols-2 gap-4
    "
    >
      {requests.map((req) => (
        <div
          key={req.id}
          className="
        flex flex-col
        px-4 py-6 lg:px-10 lg:py-12 md:px-8 md:py-4
        gap-y-8 lg:gap-y-12
        "
        >
          <EstimateDetailInfo
            key={req.id}
            requestDate={new Date(req.requestDate)} // 문자열을 Date 객체로 변환
            serviceType={req.serviceType}
            movingDate={new Date(req.movingDate)}
            departure={req.departure}
            destination={req.destination}
          />
          {/* req.id로 fetch한 견적들들 */}
          <EstimateCardList estimateRequestId={req.id} />
        </div>
      ))}
    </div>
  );
}

export default ReceivedPage;
