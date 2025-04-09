'use client';

import ChartStarRatingReview from "@/components/organisms/ChartStarRatingReview";
import ButtonStarRating from "@/components/molecules/ButtonStarRating";
import ProgressBar from "@/components/molecules/ProgressBar";
import ChatBubbleMovingChoice from "@/components/molecules/ChatBubbleMovingChoice";

function page() {
  const exampleRatingData = [0, 0, 0, 8, 170];

  return (
    <div className="bg-Black-300 p-4 g-6">
      <ChartStarRatingReview ratingData={exampleRatingData} />
      <ButtonStarRating starSize={20} />
      <div className="mb-8">
        <ProgressBar totalSteps={4} currentStep={1} />
      </div>
      <ProgressBar totalSteps={4} currentStep={2} />
      <ProgressBar totalSteps={4} currentStep={3} />
      <div className="mb-8">
        <ProgressBar totalSteps={4} currentStep={4} />
      </div>
      <ChatBubbleMovingChoice onSubmit={(selectedService) => alert(`선택된 서비스 서비스타입 이사: ${selectedService}`)} />
    </div>
  );
}

export default page;