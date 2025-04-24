//ReviewRegister

"use client";

import { DriverWithMeta } from "@/types/move.type";
import ButtonSolid from "../atoms/ButtonSolid";
import ButtonStarRating from "../molecules/ButtonStarRating";
import WorkerInfoBoxA from "./WorkerInfoBoxA";
import { useState } from "react";
import reviewApi from "@/api/review/review.api";

interface Props {
  onClose: () => void;
  driver: DriverWithMeta | null; // 리뷰를 남길 드라이버 정보
  estimateId: string;
}
/**
 * ReviewRegister 컴포넌트
 *
 * 특정 기사(이사 기사)에 대해 리뷰를 작성하고 등록할 수 있는 모달 UI 컴포넌트입니다.
 * 평점 선택, 상세 후기 입력, 리뷰 등록 버튼을 통해 사용자로부터 입력을 받아 리뷰를 서버에 전송합니다.
 * 리뷰 작성 후 등록 성공 시, 자동으로 모달이 닫히며, 실패 시 에러 메시지를 표시합니다.
 *
 * 드라이버(기사) 정보가 제공되지 않을 경우 오류 메시지를 표시합니다.
 *
 * @component
 *
 * @param {() => void} onClose - 모달을 닫는 함수
 * @param {DriverWithMeta | null} driver - 리뷰를 남길 기사 정보 (null일 경우 모달 내 에러 출력)
 * @param {string} estimateId - 리뷰가 연결될 견적 ID
 *
 * @example
 * <ReviewRegister
 *   onClose={() => setShowModal(false)}
 *   driver={selectedDriver}
 *   estimateId="est12345"
 * />
 */

function ReviewRegister({ onClose, driver, estimateId }: Props) {
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!driver || content.trim() === "") return;

    setLoading(true);
    try {
      await reviewApi.createReview({
        estimateId,
        content,
        rating,
      });

      alert("리뷰가 성공적으로 등록되었습니다.");
      onClose(); // 등록 완료 후 모달 닫기
    } catch (error) {
      console.error("리뷰 등록 실패", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!driver) return <div>driver를 불러오기 실패했습니다.</div>;

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
          isFavorite={driver.isLiked}
          favoritesCount={driver.countLike}
          experience={driver.experience}
          reviewsAverage={driver.countCompleteMoving}
          reviewsCount={driver.countLike}
          confirmedEstimateCount={driver.isDirectEstimate ? 1 : 0}
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
