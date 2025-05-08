"use client";

import { useEffect, useState } from "react";
import reviewApi from "@/api/review/review.api";
import ButtonSolid from "../atoms/ButtonSolid";
import ButtonStarRating from "../molecules/ButtonStarRating";
import WorkerInfoBoxA from "./WorkerInfoBoxA";
import { Worker } from "@/types/dtos/Worker.dto";

interface Props {
  onClose: () => void;
  driverId: string; // workerId로 사용됨
  estimateId: string;
}

function ReviewRegister({ onClose, driverId, estimateId }: Props) {
  const [driver, setDriver] = useState<Worker | null>(null);
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ 기사 정보 가져오기
  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const profile = await reviewApi.getWorkerProfile(driverId);
        setDriver(profile);
      } catch (error) {
        console.error("기사 정보 불러오기 실패", error);
      }
    };

    fetchDriverProfile();
  }, [driverId]);

  const handleSubmit = async () => {
    if (!driver || content.trim() === "") return;

    setLoading(true);
    try {
      await reviewApi.createReview({
        estimateId,
        content: content.trim(),
        rating,
      });

      alert("리뷰가 성공적으로 등록되었습니다.");
      onClose();
    } catch (error) {
      console.error("리뷰 등록 실패", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!driver) return <div>기사 정보를 불러오는 중입니다...</div>;

  return (
    <div className="p-1 flex flex-col gap-y-[26px]">
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-[700]">리뷰 쓰기</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="flex flex-col gap-y-8 mb-5">
        <WorkerInfoBoxA
          profileImage={driver.profileImage}
          nickname={driver.nickname}
          isFavorite={driver.isFavorite}
          favoritesCount={driver.favoritesCount}
          experience={driver.experience}
          reviewsAverage={driver.reviewsAverage ?? 0}
          reviewsCount={driver.reviewsCount}
          confirmedEstimatesCount={driver.confirmedEstimatesCount}
        />
        <div className="text-[16px] font-[600] flex flex-col gap-y-2">
          <h4>평점을 선택해 주세요.</h4>
          <ButtonStarRating
            disabled={false}
            initialRating={rating}
            setRating={setRating}
          />
        </div>
        <div className="text-[16px] font-[600] flex flex-col gap-y-2">
          <h4>상세 후기를 작성해 주세요.</h4>
          <textarea
            name="detailReview"
            className="px-4 py-4 text-[#ABABAB] bg-[#F7F7F7] rounded outline-none w-full h-[160px] max-h-[160px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div>
        <ButtonSolid
          onClick={handleSubmit}
          disabled={content.trim() === "" || loading}
        >
          {loading ? "등록 중..." : "리뷰 등록"}
        </ButtonSolid>
      </div>
    </div>
  );
}

export default ReviewRegister;
