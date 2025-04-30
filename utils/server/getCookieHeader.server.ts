import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트 or 서버 페이지에서만 호출되어야 함
 * - 서버에서 실행되는 api함수에서는 사용 가능(ex. getFavoriteWorkersServer 등)
 */
export const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
};
