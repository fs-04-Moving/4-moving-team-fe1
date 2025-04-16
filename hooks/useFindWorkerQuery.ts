import profilesApi from '@/api/profiles/profiles.api';
import { Worker, WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { useQuery } from '@tanstack/react-query';

// 기사리스트 불러오는 hooks
export function useFindWorkerQuery(
  params: WorkerSearchParams,
  initialData: Worker[]
) {
  return useQuery({
    queryKey: ['workers', params],
    queryFn: () => profilesApi.getWorkerProfiles(params),
    initialData,
    staleTime: 1000 * 60,
  });
}
