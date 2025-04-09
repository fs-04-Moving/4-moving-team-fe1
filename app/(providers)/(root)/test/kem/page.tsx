import ChartStarRatingReview from "@/components/organisms/ChartStarRatingReview";
import ButtonStarRating from "@/components/molecules/ButtonStarRating";
import ProgressBar from "@/components/molecules/ProgressBar";
import ChatBubbleMovingChoice from "@/components/molecules/ChatBubbleMovingChoice";



function page() {
  const exampleRatingData = [0, 0, 0, 8, 170];

  return (
    <div className="bg-Black-300 p-4 g-6">
      <ChartStarRatingReview ratingData={exampleRatingData} />
      <ButtonStarRating starSize={20}/>
      <ProgressBar totalSteps={4} currentStep={1}/>
      <ProgressBar totalSteps={4} currentStep={2}/>
      <div className="mb-8">
        <ProgressBar totalSteps={4} currentStep={4} />
      </div>
      <ChatBubbleMovingChoice/>
    </div>
  );
}

export default page;
