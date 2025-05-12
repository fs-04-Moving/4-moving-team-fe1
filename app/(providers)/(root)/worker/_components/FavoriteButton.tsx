'use client';
import favoriteApi from '@/api/favorite/favorite.api';
import icHeartGray from '@/assets/images/ic-heart-gray.svg';
import icHeartRed from '@/assets/images/ic-heart-red.svg';
import ButtonOutlined from '@/components/atoms/ButtonOutlined';
import { useAuth } from '@/contexts/AuthContext'; // 인증 컨텍스트 추가
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 라우터 추가

interface FavoriteButtonProps {
  workerId: string;
  isFavorite: boolean;
}

function FavoriteButton({ workerId, isFavorite }: FavoriteButtonProps) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인
  const router = useRouter();

  // 찜하기/취소하기 뮤테이션
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        console.log('체크 1');
        return favoriteApi.deleteFavorite(workerId);
      } else {
        console.log('체크 2');
        return favoriteApi.createFavorite(workerId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker', workerId] });
      console.log(isFavorite ? '찜 목록에서 제거되었습니다.' : '찜 목록에 추가되었습니다.');
    },
    onError: (error) => {
      console.error('찜하기/취소하기 실패:', error);
    },
  });

  console.log('아이디확인', workerId);

  // 찜하기/취소하기 토글 처리 - 로그인 상태 확인 추가
  const handleFavorite = () => {
    if (!isLoggedIn) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      console.log('로그인이 필요한 서비스입니다.');
      router.push('/auth/log-in'); // 로그인 페이지 경로로 수정
      return;
    }

    toggleFavorite();
  };

  return (
    <ButtonOutlined onClick={handleFavorite} disabled={isPending}>
      <div className="flex items-center justify-center gap-2">
        <Image
          src={isFavorite ? icHeartRed : icHeartGray}
          alt="하트 아이콘"
          width={20}
          height={20}
        />
        <span className="hidden lg:inline">
          {isPending ? '처리 중...' : isFavorite ? '찜 취소하기' : '기사님 찜하기'}
        </span>
      </div>
    </ButtonOutlined>
  );
}

export default FavoriteButton;
