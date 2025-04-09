'use client';

import Link from 'next/link';

function RequestEstimate() {
  return (
    <div className="flex justify-center h-100 items-center text-4xl">
      <Link href="/test/jhm">견적 요청</Link>
    </div>
  );
}

export default RequestEstimate;
