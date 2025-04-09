import ChartStarRatingReview from "@/components/organisms/ChartStarRatingReview";
import ButtonStarRating from "@/components/molecules/ButtonStarRating";
import ProgressBar from "@/components/molecules/ProgressBar";


function page() {
  const exampleRatingData = [0, 0, 0, 8, 170];
  
  return (
    <div className="bg-Black-300">
      <ChartStarRatingReview ratingData={exampleRatingData} />
      <ButtonStarRating starSize={20}/>
      <ProgressBar totalSteps={4} currentStep={1}/>
      <ProgressBar totalSteps={4} currentStep={2}/>
      <ProgressBar totalSteps={4} currentStep={3}/>
      <ProgressBar totalSteps={4} currentStep={4}/>
    </div>
  );
}

export default page;
