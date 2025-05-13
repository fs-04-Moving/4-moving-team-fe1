import userApi from '@/api/user/user.api';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () =>
  useQuery({
    queryKey: ['customerInfo'],
    queryFn: userApi.getUserInfo,
    staleTime: Infinity,
  });
