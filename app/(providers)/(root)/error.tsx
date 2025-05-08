'use client';

import Error from '@/components/molecules/Error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <Error message={error.message} onRetry={reset} />;
}
