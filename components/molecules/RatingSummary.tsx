import iconStar from '@/assets/images/ic-star-yellow.svg';
import clsx from 'clsx';
import Image from 'next/image';

/**
 * RatingSummary 컴포넌트
 *
 * 별 아이콘과 사용자의 평점(`rating`)과 후기 개수(`reviewsCount`)를 함께 표시하는 UI 컴포넌트입니다.
 *
 * @param {number} reviewsAverage - 사용자 또는 항목의 평점 (예: 4.5). 소수점 포함 가능.
 * @param {number} reviewsCount - 해당 평점에 대한 총 후기 수.
 * @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @example
 * <RatingSummary rating={4.8} reviewsCount={123} isResponsive={false} />
 */

function RatingSummary({
  reviewsAverage,
  reviewsCount,
  isResponsive = true,
}: {
  reviewsAverage: number;
  reviewsCount: number;
  isResponsive?: boolean;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-0.5 align-middle',
        isResponsive ? 'lg:gap-1.5' : ''
      )}
    >
      <Image
        src={iconStar}
        width={14}
        height={14}
        alt="star"
        className={clsx(
          'inline-block w-[14px] h-[14px]',
          isResponsive ? 'lg:w-[20px] lg:h-[20px]' : ''
        )}
      />
      <span
        className={clsx(
          'text-[13px] leading-none relative top-[1px]',
          isResponsive ? 'lg:text-[16px]' : ''
        )}
      >
        {reviewsAverage}
      </span>
      <span
        className={clsx(
          'text-GrayScale-300 text-[13px] leading-none relative top-[1px]',
          isResponsive ? 'lg:text-[16px]' : ''
        )}
      >
        ({reviewsCount})
      </span>
    </span>
  );
}

export default RatingSummary;
