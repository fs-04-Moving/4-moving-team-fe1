"use client";

import { useEffect, useState } from "react";
import {
  confirmEstimate,
  getPendingEstimate,
} from "@/api/estimate/customerOnly/estimate.api";
import { Estimate } from "@/types/entities/estimate.entity";
import WorkerCardInWating from "@/components/organisms/WorkerCardInWating";
import { useRouter } from "next/navigation";

export default function PendingEstimatesPage() {
  const router = useRouter();
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    async function fetchEstimates() {
      const { estimates } = await getPendingEstimate(1, 10);
      setEstimates(estimates);
    }

    fetchEstimates();
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
      {estimates.map((estimate) => (
        // eslint-disable-next-line react/jsx-key
        <WorkerCardInWating
          key={estimate.id} // 👈 여기 추가
          profileImage={estimate.profileImage}
          nickname={estimate.nickname}
          experience={estimate.experience}
          confirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={false}
          favoritesCount={estimate.favoritesCount}
          // 얜 뭐임
          services={[]}
          isDirectEstimate={false}
          price={0}
          status={"general"}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
          // 이거 뭐임
          reviewsAverage={0}
          reviewsCount={estimate.reviewsCount}
          onConfirm={async () => {
            if (!estimate.price || estimate.price <= 0) {
              alert("아직 가격이 등록되지 않아 확정할 수 없습니다.");
              return;
            }

            try {
              await confirmEstimate(estimate.id);
              alert("견적이 확정되었습니다.");
              const { estimates } = await getPendingEstimate(1, 10);
              setEstimates(estimates);
            } catch (error) {
              alert("견적 확정에 실패했습니다.");
              console.error(error);
            }
          }}
          onViewDetail={() => {
            router.push(`/customer/estimates/pending/${estimate.id}`);
          }}
        />
      ))}
    </div>
  );
}
