import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import RequestEstimate from '@/components/templates/RequestEstimate';

// export const metadata: Metadata = {
//   title: '리뷰 작성하기',
//   description: '작성 가능한 이사 서비스 리뷰 목록입니다.',
// };

/**
 * 고객의 '견적 요청' 페이지
 * @returns
 */
function RequestEstimatePage() {
  return (
    <ProtectedPageWrapper>
      <RequestEstimate />
    </ProtectedPageWrapper>
  );
}

export default RequestEstimatePage;
