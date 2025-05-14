'use client';
import { createAssignedEstimate } from '@/api/estimate/customerOnly/estimate.api';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const [hasRequested, setHasRequested] = useState(false); // 이미 요청했는지 상태 추가

  // 지정 견적 요청 mutation 설정
  const assignedEstimateMutation = useMutation({
    mutationFn: (workerId: string) => createAssignedEstimate(workerId),
    onSuccess: () => {
      setHasRequested(true); // 요청 성공 시 상태 업데이트
      Swal.fire({
        title: '경적요청 성공!',
        text: '지정 견적 요청이 성공적으로 전송되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.log('🚀 error:', error.response);
      console.log('🚀 error:', error.response?.data);
      // 에러 메시지 처리
      let errorMessage = '';

      // 백엔드에서 보내는 에러 메시지가 있는 경우
      if (error.response?.data?.message) {
        console.log('백앤드에서온 에러', error.response.data.message);
        errorMessage = error.response.data.message;
      }

      // 이미 요청한 경우는 백앤드에 없는데... 메시지라도 받아야하나?

      if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
        errorMessage = '이미 견적이 존재합니다';
        setHasRequested(true); // 이미 요청한 상태로 설정
      }

      // 일반 견적이 없는 경우
      if (error.response?.status === 400 && error.response?.data?.message?.includes('일반 견적')) {
        errorMessage = '지정 견적을 요청하기 전에 일반 견적을 먼저 작성해야 합니다.';
      }

      Swal.fire({
        // title: '오류',
        text: errorMessage,
        icon: 'info',
        confirmButtonText: '확인',
      });
    },
  });

  const handleClick = async () => {
    // 이미 요청한 상태라면 메시지 표시
    if (hasRequested) {
      Swal.fire({
        title: '알림',
        text: '이미 이 기사에게 지정 견적을 요청하셨습니다.',
        icon: 'info',
        confirmButtonText: '확인',
      });
      return;
    }

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

  // 버튼 텍스트 결정
  const buttonText = hasRequested
    ? '이미 요청한 기사입니다'
    : assignedEstimateMutation.isPending
      ? '요청 중...'
      : '지정 견적 요청하기';

  return (
    <ButtonSolid
      onClick={handleClick}
      disabled={isLoading || assignedEstimateMutation.isPending || hasRequested}
    >
      {buttonText}
    </ButtonSolid>
  );
}

export default RequestEstimateButton;
