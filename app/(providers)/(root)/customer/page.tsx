import Link from 'next/link';

/**
 * 고객의 '견적 요청' 페이지
 * @returns
 */
function RequestEstimatePage() {
  return (
    <div className="flex justify-center h-100 items-center text-4xl">
      <Link href="/test/jhm">견적 요청</Link>
    </div>
  );
}

export default RequestEstimatePage;
