
"use client";

import ReviewRegister from "@/components/organisms/ReviewRegister";
import WorkerCardInWritableReview from "@/components/organisms/WorkerCardInWritableReview";
import ResponsiveModal from "@/components/templates/ResponsiveModal";
import { Estimate } from "@/types/entities/estimate.entity";
import { useState } from "react";

export const mockEstimate: Estimate = {
  id: "691ec5a5-a662-4bd2-8f7d-1e3088c23da8",
  price: 40000,
  serviceType: "smallMove",
  status: "general",
  isConfirmed: false,
  customerName: "홍길동",
  profileImage: "",
  summary: "안녕하세요",
  nickname: "엄성",
  favoritesCount: 1,
  reviewsCount: 0,
  rating: 3,
  experience: 1,
  confirmedEstimatesCount: 0,
  movingDate: new Date("2025-04-15T10:00:00.000Z"),
  departure: "강우너도",
  destination: "Busan",
  requestDate: new Date("2025-04-01T12:00:00.000Z"),
  workerId: "d99a8eeb-4c7a-4451-ac10-905f0bd473b4",
  workerRating: 0,
  departureArea: "seoul",
};

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <WorkerCardInWritableReview
        serviceType={mockEstimate.serviceType}
        profileImage={mockEstimate.profileImage}
        nickname={mockEstimate.nickname}
        movingDate={mockEstimate.movingDate}
        price={mockEstimate.price}
        isReviewWritten={false}
        onClickWriteReview={openModal}
      />
      <ResponsiveModal
        width="w-[375px] sm:w-[508px]"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ReviewRegister
          price={mockEstimate.price}
          movingDate={mockEstimate.movingDate}
          serviceType={mockEstimate.serviceType}
          onClose={closeModal}
          driverId={mockEstimate.workerId}
          estimateId={mockEstimate.id}
        />
      </ResponsiveModal>
    </div>
  );
}

export default Page;
