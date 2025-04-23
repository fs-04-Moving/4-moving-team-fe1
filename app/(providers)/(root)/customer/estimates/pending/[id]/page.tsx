"use client";

import { Estimate } from "@/types/entities/estimate.entity";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EstimateDetailInfo from "@/components/organisms/EstimateDetailInfo";
import WorkerCardInLiked from "@/components/organisms/WorkerCardInLiked";
import ButtonSolid from "@/components/atoms/ButtonSolid";
import ButtonShareKakao from "@/components/atoms/ButtonShareKakao";
import ButtonShareFacebook from "@/components/atoms/ButtonShareFacebook";
import ButtonClipOutlined from "@/components/atoms/ButtonClipOutlined";
import {
  confirmEstimateByCustomer,
  getEstimateDetailByCustomer,
} from "@/api/estimate/customerOnly/estimate.api";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);

  // 공유 버튼 블록을 변수로 분리
  const ShareButtons = (
    <div className="flex flex-col gap-y-4">
      <p className="text-[20px] font-[600]">견적 공유하기</p>
      <div className="flex gap-x-4">
        <ButtonShareKakao
          onClick={() => {
            router.push("/customer");
          }}
        />
        <ButtonShareFacebook onClick={() => {}} />
        <ButtonClipOutlined onClick={() => {}} />
      </div>
    </div>
  );
  const handleConfirm = async () => {
    if (!estimate) return; // null이면 실행 안 함

    try {
      const result = await confirmEstimateByCustomer(estimate.id);
      if (result?.success) {
        alert("성공적으로 기사님을 확정했습니다!");
        router.push("/customer");
      } else {
        alert(result?.message || "확정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("기사님 확정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchEstimate = async () => {
      setLoading(true);
      const data = await getEstimateDetailByCustomer(id);
      if (data) {
        setEstimate(data);
      }
      setLoading(false);
    };

    fetchEstimate();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!estimate) return <div>견적 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row gap-10">
      {/* 왼쪽 영역 */}
      <div className="flex-1 flex flex-col gap-y-10">
        <WorkerCardInLiked
          id={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.customerName}
          experience={estimate.experience.toString()}
          workerConfirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={true}
          favoritesCount={estimate.favoritesCount}
          services={[estimate.serviceType]}
          reviewsAverage={estimate.reviewsCount}
          reviewsCount={estimate.reviewsCount}
        />
        <div className="flex flex-col gap-y-4">
          <p className="text-[24px] font-[600]">견적가</p>
          <p className="text-[32px] font-[700]">{estimate.price}원</p>
        </div>

        {/* ✅ Mobile/Tablet 전용 공유 버튼 */}
        <div className="block lg:hidden">{ShareButtons}</div>

        <EstimateDetailInfo
          requestDate={estimate.requestDate}
          serviceType={estimate.serviceType}
          movingDate={estimate.movingDate}
          departure={estimate.departure}
          destination={estimate.destination}
        />
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-1 flex flex-col gap-y-10 mt-6">
        <ButtonSolid onClick={handleConfirm}>견적 확정하기</ButtonSolid>

        {/* ✅ Desktop 전용 공유 버튼 */}
        <div className="hidden lg:block">{ShareButtons}</div>
      </div>
    </div>
  );
}
