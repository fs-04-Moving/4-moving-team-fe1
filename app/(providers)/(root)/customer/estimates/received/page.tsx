"use client";

import estimateRequestApi from "@/api/estimate-request/estimateRequest.api";
import { InactiveEstimateRequest } from "@/types/dtos/estimateRequest.dto";
import { useEffect, useState } from "react";

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
    <div>
      <h1>비활성 견적 요청 목록</h1>
      <p>총 개수: {totalCount}</p>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            <strong>{req.serviceType}</strong> - {req.departureAddress} →{" "}
            {req.destination}
            <br />
            이사일: {new Date(req.movingDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReceivedPage;
