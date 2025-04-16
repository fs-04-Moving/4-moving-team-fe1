import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import RequestEstimate from '@/components/templates/RequestEstimate';

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
