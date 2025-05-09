"use client";

import {
  confirmEstimate,
  getEstimateDetailByCustomer,
} from "@/api/estimate/customerOnly/estimate.api";
import favoriteApi from "@/api/favorite/favorite.api";
import ButtonClipOutlined from "@/components/atoms/ButtonClipOutlined";
import ButtonLikeOutlined from "@/components/atoms/ButtonLikeOutlined";
import ButtonShareFacebook from "@/components/atoms/ButtonShareFacebook";
import ButtonShareKakao from "@/components/atoms/ButtonShareKakao";
import ButtonSolid from "@/components/atoms/ButtonSolid";
import EstimateDetailInfo from "@/components/organisms/EstimateDetailInfo";
import WorkerCardInDetail from "@/components/organisms/WorkerCardInDetail";
import { Estimate } from "@/types/entities/estimate.entity";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  console.log("likeCount 확인", likeCount);

  const handleLikeClick = async () => {
    const workerId = estimate?.workerId;

    if (!workerId) {
      console.warn("workerId가 없습니다.");
      alert("작업자 정보가 없어 좋아요를 누를 수 없습니다.");
      return;
    }

    try {
      if (liked) {
        await favoriteApi.deleteFavorite(workerId);
      } else {
        await favoriteApi.createFavorite(workerId);
      }

      const updatedCount = await favoriteApi.getFavoriteCountByWorkerId(
        workerId
      );
      setLikeCount(updatedCount);
      setLiked(!liked);
    } catch (error) {
      console.error("좋아요 토글 실패", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const ShareButtons = (
    <div className="flex flex-col gap-y-4">
      <p className="text-[20px] font-[600]">견적 공유하기</p>
      <div className="flex gap-x-4">
        <ButtonShareKakao onClick={() => router.push("/customer")} />
        <ButtonShareFacebook onClick={() => {}} />
        <ButtonClipOutlined onClick={() => {}} />
      </div>
    </div>
  );

  useEffect(() => {
    if (!id) return;

    const fetchEstimate = async () => {
      setLoading(true);
      try {
        const data = await getEstimateDetailByCustomer(id);
        if (data) {
          setEstimate(data);

          if (data.workerId) {
            const count = await favoriteApi.getFavoriteCountByWorkerId(
              data.workerId
            );
            setLikeCount(count);

            // ✅ 추가: 현재 유저의 좋아요 목록을 조회하고, workerId가 포함되어 있는지 확인
            const favoriteData = await favoriteApi.getFavoriteWorkers();
            const isLiked = favoriteData?.list.some(
              (worker: { id: string }) => worker.id === data.workerId
            );
            setLiked(isLiked);
          }
        }
      } catch (err) {
        console.error("견적 정보 또는 좋아요 상태 조회 실패", err);
      }
      setLoading(false);
    };

    fetchEstimate();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!estimate) return <div>견적 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="mx-auto w-[327px] md:w-[600px] lg:w-[1400px] flex flex-col lg:flex-row lg:gap-x-20gap-10">
      {/* 왼쪽 영역 */}
      <div className="flex-1 flex flex-col gap-y-10">
        <WorkerCardInDetail
          id={estimate.id}
          profileImage={estimate.profileImage}
          nickname={estimate.nickname} // ✅ 수정
          confirmedEstimatesCount={estimate.confirmedEstimatesCount}
          isFavorite={liked}
          favoritesCount={estimate.favoritesCount}
          services={[estimate.serviceType]}
          reviewsAverage={estimate.rating ?? 0}
          reviewsCount={estimate.reviewsCount}
          summary={estimate.summary}
          experience={estimate.experience.toString()}
        />
        <div className="flex flex-col gap-y-4">
          <p className="text-[24px] font-[600]">견적가</p>
          <p className="text-[32px] font-[700]">{estimate.price ?? "-"}원</p>
        </div>

        {/* Mobile/Tablet 공유 버튼 */}
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
      <div className="flex-1 flex gap-x-2 gap-y-10 mt-6">
        <div className="block lg:hidden">
          <ButtonLikeOutlined onClick={handleLikeClick} />
        </div>
        <div className="w-full flex flex-col gap-y-10">
          <ButtonSolid
            onClick={async () => {
              if (!estimate.price || estimate.price <= 0) {
                alert("아직 가격이 등록되지 않아 확정할 수 없습니다.");
                return;
              }

              try {
                await confirmEstimate(estimate.id);
                alert("견적이 확정되었습니다.");
              } catch (error) {
                alert("견적 확정에 실패했습니다.");
                console.error(error);
              }
            }}
          >
            견적 확정하기
          </ButtonSolid>

          {/* Desktop 공유 버튼 */}
          <div className="hidden lg:block">{ShareButtons}</div>
        </div>
      </div>
    </div>
  );
}
