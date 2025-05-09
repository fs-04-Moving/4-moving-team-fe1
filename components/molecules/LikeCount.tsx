import icHeartGray from '@/assets/images/ic-heart-gray.svg';
import icHeartNavy from '@/assets/images/ic-heart-navy.svg';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  isFavorite: boolean;
  favoritesCount: number;
  isResponsive?: boolean;
};
/**
 * LikeCount 컴포넌트
 *
 * 하트 아이콘과 사용자의 좋아요 여부(`isFavorite`)과 기사의 좋아요 개수(`countLike`)를 함께 표시하는 UI 컴포넌트입니다.
 *
 * @param {boolean} isFavorite - 로그인 사용자가 해당 기사를 '좋아요'했는지 여부
 * @param {number} favoritesCount - 해당 기사를 좋아요한 유저의 개수
 * @param {boolean} isResponsive - 기본값:true, false면 반응형을 적용하지 않고, 크기를 sm으로 고정
 *
 * @example
 * <LikeCount isFavorite={true} countLike={128} isResponsive={false}/>
 */
function LikeCount({ isFavorite, favoritesCount, isResponsive = true }: Props) {
  return (
    <span className={clsx('inline-flex gap-0.5', isResponsive ? 'lg:gap-1 align-middle' : '')}>
      <Image src={isFavorite ? icHeartNavy : icHeartGray} width={14} height={12} alt="like heart" />
      <span
        className={clsx('text-[13px] relative top-[1px]', isResponsive ? 'lg:text-[18px]' : '')}
      >
        {favoritesCount}
      </span>
    </span>
  );
}

export default LikeCount;
