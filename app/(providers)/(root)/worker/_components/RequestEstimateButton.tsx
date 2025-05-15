'use client';
import { createAssignedEstimate } from '@/api/estimate/customerOnly/estimate.api';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'; // Next.js의 router import 추가
import { useState } from 'react';
import Swal from 'sweetalert2';

interface RequestEstimateButtonProps {
  workerId: string;
}

// API 에러 응답 타입 정의
interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

function RequestEstimateButton({ workerId }: RequestEstimateButtonProps) {
  const { isLoggedIn, user } = useAuth();
  const [hasRequested, setHasRequested] = useState(false); // 이미 요청했는지 상태 추가
  const router = useRouter();

  // 지정 견적 요청 mutation 설정
  const assignedEstimateMutation = useMutation({
    mutationFn: (workerId: string) => createAssignedEstimate(workerId),
    onSuccess: () => {
      setHasRequested(true);
      Swal.fire({
        title: '경적요청 성공!',
        text: '지정 견적 요청이 성공적으로 전송되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // 에러 메시지 처리
      let errorMessage = '';

      // 견적이 있는경우
      if (error.message?.includes('already')) {
        errorMessage = '이미 견적이 존재합니다';
        setHasRequested(true);
      }

      // 일반 견적이 없는 경우
      if (error.message.includes('acitve Estimate Request not found')) {
        errorMessage = '지정 견적을 요청하기 전에 일반 견적을 먼저 작성해야 합니다.';
        Swal.fire({
          text: errorMessage,
          icon: 'info',
          confirmButtonText: '바로가기',
          showCancelButton: true,
          cancelButtonText: '남아있기',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/customer');
          }
        });
      }

      // 로그인 상태 확인
      if (!isLoggedIn) {
        Swal.fire({
          title: '로그인 필요',
          text: '로그인이 필요한 서비스입니다.',
          icon: 'info',
          confirmButtonText: '로그인하러가기',
          showCancelButton: true,
          cancelButtonText: '나중에하기',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/auth/log-in');
          }
        });
        return;
      }
    },
  });

  const handleClick = async () => {
    // 지정 견적 요청 API 호출
    assignedEstimateMutation.mutate(workerId);
  };

  // 버튼 텍스트 결정
  const buttonText = '지정 견적 요청하기';

  return (
    <ButtonSolid onClick={handleClick} disabled={hasRequested}>
      {buttonText}
    </ButtonSolid>
  );
}

export default RequestEstimateButton;
