import authApi from '@/api/auth/auth.api';
import { LogInDto, SignUpDto } from '@/types/dtos/auth.dto';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/**
 * 재사용은 아니지만 가독성 관점에서 분리
 */
export function useSignUpMutation({
  setError,
  setIsProcessing,
  logIn,
}: {
  setError: UseFormSetError<SignUpDto>;
  setIsProcessing: (v: boolean) => void;
  logIn: (loginData: LogInDto) => void;
}) {
  return useMutation({
    mutationFn: (data: SignUpDto) => authApi.singUp(data),
    onSuccess: (_, variables) => {
      logIn({
        email: variables.email,
        password: variables.password,
        role: variables.role,
      });
    },
    onError: (error: AxiosError) => {
      setIsProcessing(false);
      const message = error.response?.data || '';
      if (message === '이미 존재하는 이메일입니다.') {
        setError('email', { message: '이미 사용중인 이메일입니다' });
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
}
