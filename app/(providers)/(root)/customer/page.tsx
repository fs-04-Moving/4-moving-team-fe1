import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import RequestEstimate from '@/components/templates/RequestEstimate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 요청하기',
  description: '고객이 이사 정보를 입력하여 견적을 요청하는 페이지입니다.',
};

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
