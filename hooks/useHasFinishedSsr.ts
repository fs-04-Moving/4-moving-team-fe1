'use client';

import { useEffect, useState } from 'react';

/**
 * SSR이 완료되었는지 체크하는 hook
 * - 현재 로그인 정보를 SSR로 불러오는 구조
 * - 로그인 정보에 따라 페이지를 리다이렉트시킬 경우
 * - 로그인 정보 로딩 중에는 페이지를 렌더링시키지 않는 등에 사용
 * @returns
 */
function useHasFinishedSsr(): boolean {
  const [hasFinishedSsr, setHasFinishedSsr] = useState(false);

  useEffect(() => {
    setHasFinishedSsr(true);
  }, []);
  return hasFinishedSsr;
}

export default useHasFinishedSsr;
