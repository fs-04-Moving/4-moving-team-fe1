import ChartStarRatingReview from "@/components/organisms/ChartStarRatingReview";

function page() {
  const exampleRatingData = [0, 0, 0, 8, 170];

  return (
    <div className="bg-Black-300">
      <ChartStarRatingReview ratingData={exampleRatingData} />
    </div>
  );
}

export default page;
