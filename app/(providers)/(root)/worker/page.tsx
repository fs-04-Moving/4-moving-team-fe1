import ProtectedPageWrapper from '@/components/atoms/ProtectedPageWrapper';
import ReceivedRequests from '@/components/templates/ReceivedRequests';

/**
 * 기사님의 '받은 요청' 목록 페이지
 * @returns
 */
function ReceivedRequestsPage() {
  return (
    <ProtectedPageWrapper>
      <ReceivedRequests />
    </ProtectedPageWrapper>
  );
}

export default ReceivedRequestsPage;
