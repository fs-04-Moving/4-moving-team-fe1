import { cookies } from 'next/headers';
import { getAccessTokenFromRefreshTest } from '@/utils/getAccessTokenTest';
import { getSentEstimatesServer } from '@/api/estimate/workerOnly/getSentEstimatesServer';
import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import EstimateDetailContent from '@/components/organisms/EstimateDetailContent';
import { EstimateStatus, ServiceType } from '@/types/move.type';

const ITEMS_PER_PAGE = 4;

export default async function EstimateDetailPage({
  params,
}: {
  params: { estimateId: string };
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return <div>로그인이 필요합니다</div>;
  }

  const accessToken = await getAccessTokenFromRefreshTest();
  if (!accessToken) {
    return <div>로그인이 필요합니다</div>;
  }

  let data;
  try {
    data = await getSentEstimatesServer(1, ITEMS_PER_PAGE, accessToken);
  } catch (e) {
    return <div>데이터 로드 실패</div>;
  }

  const estimate = data.list.find((item) => item.id === params.estimateId);

  if (!estimate) {
    return <div>견적을 찾을 수 없습니다</div>;
  }

  return (
    <ProtectedPageWrapper>
      <div className="w-full min-h-screen bg-BackGround-100 py-10">
        <EstimateDetailContent
          estimate={{
            ...estimate,
            status: estimate.status as EstimateStatus,
            serviceType: estimate.serviceType as ServiceType,
          }}
        />
      </div>
    </ProtectedPageWrapper>
  );
}
