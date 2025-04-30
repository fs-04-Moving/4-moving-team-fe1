import estimateRequestApi from "@/api/estimate-request/estimateRequest.api";
import ProtectedPageWrapper from "@/components/atoms/ProtectedPageWrapper";
import ReceivedRequests from "@/components/templates/ReceivedRequests";
import { createServerQueryClient } from "@/libs/tanstack-query/reactQueryConfig";
import { ReceivedEstimateRequestSearchParams } from "@/types/dtos/estimateRequest.dto";
import { getAccessTokenFromRefresh } from "@/utils/jwtUtils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

/**
 * 기사님의 '받은 요청' 목록 페이지
 * @returns
 */
const baseParams: ReceivedEstimateRequestSearchParams = {
  page: 1,
  pageSize: 3,
  serviceType: undefined,
  orderBy: undefined,
  search: undefined,
  filter: undefined,
};

async function ReceivedRequestsPage() {
  const accessToken = await getAccessTokenFromRefresh();

  if (!accessToken) {
    return;
  }

  const queryClient = createServerQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["ReceivedEstimateRequests", baseParams],
    queryFn: ({ pageParam = 1 }) => {
      return estimateRequestApi.getReceivedEstimateRequestsSever(accessToken, {
        ...baseParams,
        page: pageParam,
      });
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProtectedPageWrapper>
        <ReceivedRequests />
      </ProtectedPageWrapper>
    </HydrationBoundary>
  );
}

export default ReceivedRequestsPage;
