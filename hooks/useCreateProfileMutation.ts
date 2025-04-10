import { handleProfileSuccess } from '@/utils/handlerUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

/**
 * 프로필 생성 공통 mutation 훅
 * @param mutationFn - 실제 프로필 생성 API 함수 (e.g., profilesApi.createCustomerProfile)
 */
export function useCreateProfileMutation<TInput extends object>(
  mutationFn: (data: TInput) => Promise<{ accessToken: string }>
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: async (res) => {
      await handleProfileSuccess({
        accessToken: res.accessToken,
        router,
        queryClient,
      });
    },
  });

  return mutation;
}
