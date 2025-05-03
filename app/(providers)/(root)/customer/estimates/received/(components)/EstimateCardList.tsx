// components/organisms/EstimateCardList.tsx
"use client";

import { useEffect, useState } from "react";
import { Estimate } from "@/types/entities/estimate.entity";
import { getReceivedEstimates } from "@/api/estimate/customerOnly/estimate.api";
import WorkerCardInList from "@/components/organisms/WorkerCardInList";

interface Props {
  estimateRequestId: string;
}

function EstimateCardList({ estimateRequestId }: Props) {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await getReceivedEstimates({
          estimateRequestId,
          page: 1,
          pageSize: 10,
        });

        if (!response) {
          setError("견적 데이터를 불러오지 못했습니다.");
          return;
        }

        setEstimates(response.list);
      } catch (err) {
        setError("견적 조회 실패");
        console.error(err);
      }
    };

    fetchEstimates();
  }, [estimateRequestId]);

  if (error) return <div>{error}</div>;

  return (
    <div
      className="flex flex-col gap-y-6
    "
    >
      <h2 className="text-[16px] md:text-[16px] lg:text-[24px] font-[600]">
        견적 목록
      </h2>
      <div>{/* 정렬 목록 */}</div>
      <ul className="mt-2 space-y-2">
        {estimates.map((estimate) => (
          // eslint-disable-next-line react/jsx-key
          <div className="w-full">
            <WorkerCardInList
              key={estimate.id}
              profileImage={estimate.profileImage}
              nickname={estimate.nickname}
              experience={estimate.experience}
              confirmedEstimatesCount={estimate.confirmedEstimatesCount}
              isFavorite={false}
              favoritesCount={estimate.favoritesCount}
              services={["smallMove", "homeMove"]}
              isDirectEstimate={false}
              price={estimate.price ?? 0}
              reviewsAverage={0}
              reviewsCount={estimate.reviewsCount}
              summary={estimate.summary}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default EstimateCardList;
