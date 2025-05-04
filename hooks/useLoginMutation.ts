import authApi from '@/api/auth/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { LogInDto } from '@/types/dtos/auth.dto';
import { User } from '@/types/entities/user.entity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface UseLoginMutationOptions {
  setIsProcessing: (v: boolean) => void;
  onError?: (error: AxiosError) => void;
}

/**
 * 로그인 mutation 훅
 * @param setIsProcessing 로딩 상태 setter
 * @param onError 로그인 실패 시 커스텀 에러 처리 콜백 (선택)
 * - 로그인 시의 에러 처리와 회원가입 후 자동로그인 처리 시의 에러 처리는 차이가 있어서 onError를 별도로 받음
 */
export function useLoginMutation({
  setIsProcessing,
  onError,
}: UseLoginMutationOptions) {
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
      onError?.(error); // 외부에서 주입한 에러 처리 콜백이 있다면 실행
    },
  });
}
