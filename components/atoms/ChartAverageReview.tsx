interface ChartAverageReviewProps {
  ratingData?: number;
}

/**
 * 평균 별점 컴포넌트입니다.
 *
 * @description
 * 주어진 별점 데이터를 소수점 첫째 자리까지 표시하고, "/5"를 함께 보여줍니다.
 * 별점 데이터가 없을 경우 0.0입니다.
 * 반올림해서 별점을 반영합니다. 0.5부터 +1칸 찬별을 보여줍니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {number} [props.ratingData] - 평균 별점 데이터
 *
 * @example
 * <ChartAverageReview ratingData={4.5} /> - 평균 별점이 4.5인 경우
 * <ChartAverageReview ratingData={null} /> - 평균 별점 데이터가 없는 경우
 */

function ChartAverageReview({ ratingData }: ChartAverageReviewProps) {
  const ratingValue = ratingData ? ratingData.toFixed(1) : '0.0';
  return (
    <p>
      <span className="text-[40px] lg:text-[64px] md:text-[40px]  text-Black-400 font-bold ">
        {ratingValue}
      </span>
      <span className="lg:text-[38px] md:text-[24px] text-[24px] text-GrayScale-100 font-bold ">
        /5
      </span>
    </p>
  );
}

export default ChartAverageReview;
