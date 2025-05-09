import authApi from '@/api/auth/auth.api';
import { LogInDto, SignUpDto } from '@/types/dtos/auth.dto';
import { getErrorMessageFromCode } from '@/utils/oauth/getErrorMessageFromCode';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

interface ErrorResponse {
  errorCode?:
    | 'PROVIDER_MISMATCH'
    | 'ROLE_MISMATCH'
    | 'EMAIL_ALREADY_EXISTS'
    | 'USER_CREATION_FAILED'
    | 'UNKNOWN_ERROR';
  existingProvider?: string;
  provider?: string;
  role?: string;
  existingRole?: string;
  requestedRole?: string;
  email?: string;

  [key: string]: string | undefined; // 인덱스 시그니처 추가
}

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
  const router = useRouter();

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

      const data = (error.response?.data || {}) as ErrorResponse;

      if (data?.errorCode) {
        const message = getErrorMessageFromCode(data.errorCode, data);

        if (data.errorCode === 'PROVIDER_MISMATCH' || data.errorCode === 'ROLE_MISMATCH') {
          const query = new URLSearchParams(data as Record<string, string>).toString();
          router.replace(`/auth/callback?${query}`);
          return;
        }

        if (data.errorCode === 'EMAIL_ALREADY_EXISTS') {
          setError('email', { message });
        } else {
          alert(message);
        }
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
}
