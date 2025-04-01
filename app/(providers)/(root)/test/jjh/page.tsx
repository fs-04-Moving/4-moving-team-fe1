import RatingSummary from '@/components/molecules/RatingSummary';
import UserAvartar from '@/components/atoms/UserAvartar';
import LikeCount from '@/components/molecules/LikeCount';

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>
      <UserAvartar />
      <UserAvartar />
      <RatingSummary rating={4.5} reviewCount={231} />
      <LikeCount isLiked={true} countLike={136} />
      <LikeCount isLiked={false} countLike={209} />
    </div>
  );
}

export default page;
