"use client";

import ReviewRegister from "@/components/organisms/ReviewRegister";
import ResponsiveModal from "@/components/templates/ResponsiveModal";
import { DriverWithMeta } from "@/types/move.type";
import { useState } from "react";

const mockDriver: DriverWithMeta = {
  id: "driver1",
  profileImage: "",
  nickname: "김철수",
  experience: 5,
  summary: "짧은 요약",
  description: "상세 설명",
  services: ["smallMove", "homeMove"],
  serviceAreas: { seoul: "서울", gyeonggi: "경기" },
  countCompleteMoving: 15,
  isLiked: true,
  countLike: 50,
  isDirectEstimate: true,
  estimatePrice: 50000,
};

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const estimateId = "0e58843c-ed05-4acd-8dd4-a89db988c84a";
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">GeneralModal 사용 예시</h1>

      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
      >
        모달 열기
      </button>

      <ResponsiveModal
        width="w-[608px]"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ReviewRegister
          onClose={closeModal} //모달 닫기 함수 전달
          estimateId={estimateId} //estimate의 ID
          driver={mockDriver} //해당 기사
        />
      </ResponsiveModal>
    </div>
  );
}

export default Page;
