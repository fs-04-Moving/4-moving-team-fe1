'use client';

import { useAuth } from '@/contexts/AuthContext';
import useHasFinishedSsr from '@/hooks/useHasFinishedSsr';
import Link from 'next/link';

function RequestEstimate() {
  const {} = useAuth();
  const hasFinishedSsr = useHasFinishedSsr();

  if (!hasFinishedSsr) return null;
  return (
    <div className="flex justify-center h-100 items-center text-4xl">
      <Link href="/test/jhm">견적 요청</Link>
    </div>
  );
}

export default RequestEstimate;
