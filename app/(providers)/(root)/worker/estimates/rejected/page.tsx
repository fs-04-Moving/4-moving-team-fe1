import { getAccessTokenFromRefreshTest } from '@/utils/getAccessTokenTest';
import { getRejectedEstimatesSSR } from '@/api/estimate/workerOnly/getRejectedEstimates';
import RejectedEstimateList from '@/components/organisms/RejectedEstimateList';
import PaginationWrapper from '@/components/organisms/PaginationWrapper';

const ITEMS_PER_PAGE = 4;

export default async function RejectedEstimatesPage({
  searchParams,
}: {
  searchParams: { page?: string | null };
}) {
  const page = Number(searchParams?.page ?? '1');
  const pageSize = ITEMS_PER_PAGE;

  const accessToken = await getAccessTokenFromRefreshTest();

  console.log('✅ accessToken:', accessToken);

  if (!accessToken) {
    return <div>🔐 로그인 필요</div>;
  }

  let data;
  try {
    data = await getRejectedEstimatesSSR(page, pageSize, accessToken);
  } catch (e) {
    return <div>🚨 데이터 로드 실패</div>;
  }

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
      <RejectedEstimateList data={data.list} />
      <PaginationWrapper
        currentPage={page}
        totalPages={totalPages}
        className="mt-2"
      />
    </div>
  );
}
