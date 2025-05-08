'use client';
import favoriteApi from '@/api/favorite/favorite.api';
import icHeartGray from '@/assets/images/ic-heart-gray.svg';
import icHeartRed from '@/assets/images/ic-heart-red.svg';
import ButtonOutlined from '@/components/atoms/ButtonOutlined';
import { useAuth } from '@/contexts/AuthContext'; // 인증 컨텍스트 추가
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 라우터 추가
import { useEffect, useState } from 'react';

interface FavoriteButtonProps {
  workerId: string;
  initialIsFavorite?: boolean;
}

function FavoriteButton({
  workerId,
  initialIsFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인
  const router = useRouter();

  // 찜 상태 확인 쿼리 - 로그인된 경우에만 실행
  const { data: favoriteStatus } = useQuery({
    queryKey: ['favorite', 'check', workerId],
    queryFn: () => favoriteApi.checkFavorite(workerId),
    enabled: !!workerId && isLoggedIn, // 로그인된 경우에만 쿼리 실행
  });

  // 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (favoriteStatus !== undefined) {
      setIsFavorite(favoriteStatus);
    }
  }, [favoriteStatus]);

  // 찜하기/취소하기 뮤테이션
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        return favoriteApi.deleteFavorite(workerId);
      } else {
        return favoriteApi.createFavorite(workerId);
      }
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
      queryClient.invalidateQueries({ queryKey: ['favorite'] });
      console.log(
        isFavorite ? '찜 목록에서 제거되었습니다.' : '찜 목록에 추가되었습니다.'
      );
    },
    onError: (error) => {
      console.error('찜하기/취소하기 실패:', error);
    },
  });

  // 찜하기/취소하기 토글 처리 - 로그인 상태 확인 추가
  const handleFavorite = () => {
    if (!isLoggedIn) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      console.log('로그인이 필요한 서비스입니다.');
      router.push('/login'); // 로그인 페이지 경로로 수정
      return;
    }

    toggleFavorite();
  };

  return (
    <ButtonOutlined onClick={handleFavorite} disabled={isPending}>
      <div className='flex items-center justify-center gap-2'>
        <Image
          src={isFavorite ? icHeartRed : icHeartGray}
          alt='하트 아이콘'
          width={20}
          height={20}
        />
        <span className='hidden lg:inline'>
          {isPending
            ? '처리 중...'
            : isFavorite
            ? '찜 취소하기'
            : '기사님 찜하기'}
        </span>
      </div>
    </ButtonOutlined>
  );
}

export default FavoriteButton;
