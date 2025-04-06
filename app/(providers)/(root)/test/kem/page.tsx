import AverageRating from "@/components/atoms/AverageRating";
import StarRatingProgressBar from "@/components/atoms/StarRatingProgressBar";
import StarLating from "@/components/molecules/StarLating";
import StarRatingCard from "@/components/organisms/StarRatingCard";

function page() {
  const exampleRatingData = [
    { rating: 1, count: 10 },
    { rating: 2, count: 100 },
    { rating: 3, count: 0 },
    { rating: 4, count: 200 },
    { rating: 5, count: 0 },
  ];

  return (
    <div>
      <StarLating />
      <AverageRating />
      <StarRatingProgressBar />
      <StarRatingCard ratingData={exampleRatingData} />
    </div>
  );
}

export default page;
