import iconStar from '@/assets/images/ic-star-yellow.svg';
import Image from 'next/image';

/**
 * RatingSummary 컴포넌트
 *
 * 별 아이콘과 사용자의 평점(`rating`)과 후기 개수(`reviewCount`)를 함께 표시하는 UI 컴포넌트입니다.
 *
 * @param {number} rating - 사용자 또는 항목의 평점 (예: 4.5). 소수점 포함 가능.
 * @param {number} reviewCount - 해당 평점에 대한 총 후기 수.
 *
 * @example
 * <RatingSummary rating={4.8} reviewCount={123} />
 */

function RatingSummary({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <span className="inline-flex items-center justify-center gap-0.5 lg:gap-1.5 align-middle">
      <Image
        src={iconStar}
        width={14}
        height={14}
        alt="star"
        className="inline-block w-[14px] h-[14px] lg:w-[20px] lg:h-[20px]"
      />
      <span className="text-[13px] lg:text-[16px] leading-none relative top-[1px]">
        {rating}
      </span>
      <span className="text-GrayScale-300 text-[13px] lg:text-[16px] leading-none relative top-[1px]">
        ({reviewCount})
      </span>
    </span>
  );
}

export default RatingSummary;
