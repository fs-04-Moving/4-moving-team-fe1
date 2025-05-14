'use client';
import { createAssignedEstimate } from '@/api/estimate/customerOnly/estimate.api';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface RequestEstimateButtonProps {
  workerId: string;
}

function RequestEstimateButton({ workerId }: RequestEstimateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();

  // 지정 견적 요청 mutation 설정
  const assignedEstimateMutation = useMutation({
    mutationFn: (workerId: string) => createAssignedEstimate(workerId),
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '지정 견적 요청이 성공적으로 전송되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onError: (error: any) => {
      // 에러 메시지 처리
      let errorMessage = '지정 견적 요청 중 오류가 발생했습니다.';

      // 백엔드에서 보내는 에러 메시지가 있는 경우
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      // 이미 지정 견적을 요청한 경우 (백엔드 응답에 따라 조건 수정 필요)
      if (error.response?.status === 400 && error.response?.data?.message?.includes('이미 요청')) {
        errorMessage = '이미 이 작업자에게 지정 견적을 요청하셨습니다.';
      }

      // 일반 견적이 없는 경우
      if (error.response?.status === 400 && error.response?.data?.message?.includes('일반 견적')) {
        errorMessage = '지정 견적을 요청하기 전에 일반 견적을 먼저 작성해야 합니다.';
      }

      Swal.fire({
        title: '오류',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: '확인',
      });
    },
  });

  const handleClick = async () => {
    // 로그인 상태 확인
    if (!isLoggedIn) {
      Swal.fire({
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다.',
        icon: 'info',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          // 로그인 페이지로 이동
          window.location.href = '/login';
        }
      });
      return;
    }

    // 지정 견적 요청 API 호출
    assignedEstimateMutation.mutate(workerId);
  };

  return (
    <ButtonSolid onClick={handleClick} disabled={isLoading || assignedEstimateMutation.isPending}>
      {assignedEstimateMutation.isPending ? '요청 중...' : '지정 견적 요청하기'}
    </ButtonSolid>
  );
}

export default RequestEstimateButton;
