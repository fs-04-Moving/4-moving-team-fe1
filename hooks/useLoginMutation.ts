import authApi from '@/api/auth/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { LogInDto } from '@/types/dtos/auth.dto';
import { User } from '@/types/entities/user.entity';
import { getErrorMessageFromCode } from '@/utils/oauth/getErrorMessageFromCode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface UseLoginMutationOptions {
  setIsProcessing: (v: boolean) => void;
  onError?: (error: AxiosError) => void;
}

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
  [key: string]: string | undefined;
}

/**
 * 로그인 mutation 훅
 * @param setIsProcessing 로딩 상태 setter
 * @param onError 로그인 실패 시 커스텀 에러 처리 콜백 (선택)
 * - 로그인 시의 에러 처리와 회원가입 후 자동로그인 처리 시의 에러 처리는 차이가 있어서 onError를 별도로 받음
 */
export function useLoginMutation({ setIsProcessing, onError }: UseLoginMutationOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { logIn: authLogin } = useAuth();

  return useMutation({
    mutationFn: (data: LogInDto) => authApi.logIn(data),

    onSuccess: async () => {
      await authLogin?.();
      const user: User | undefined = queryClient.getQueryData(['me']);
      if (user) {
        const routePath = user.hasProfile ? '' : '/profile';
        router.push(`/${user.role}${routePath}`);
      }
    },

    onError: (error: AxiosError) => {
      setIsProcessing(false);

      const data = (error.response?.data || {}) as ErrorResponse;
      // 메시지 매핑 처리
      if (data.toString() === '유저가 존재하지 않습니다.') {
        Swal.fire({
          title: '로그인 실패',
          text: '유저가 존재하지 않습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
        return;
      }

      if (data.toString() === 'Incorrect password') {
        Swal.fire({
          title: '로그인 실패',
          text: '패스워드가 일치하지 않습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
        return;
      }

      if (data?.errorCode) {
        const message = getErrorMessageFromCode(data.errorCode, data);

        // provider 또는 role 불일치 시 callback 페이지로 리디렉션
        if (data.errorCode === 'PROVIDER_MISMATCH' || data.errorCode === 'ROLE_MISMATCH') {
          const query = new URLSearchParams(data as Record<string, string>).toString();
          router.replace(`/auth/callback?${query}`);
          return;
        }

        Swal.fire({
          title: '로그인 실패',
          text: message,
          icon: 'error',
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          title: '오류 발생',
          text: '에러가 발생했습니다. 다시 시도해 주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }

      // 외부에서 전달된 onError 콜백이 있다면 호출
      onError?.(error);
    },
  });
}
