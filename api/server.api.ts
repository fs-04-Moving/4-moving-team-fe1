// 서버용 함수를 별도로 만들어야 하는 이유
// 1. URL의 차이
// - 서버에서 실행될 경우 next.config.ts의 rewrite가 작동하지 않으므로 절대 경로가 필요
// 2. 토큰의 전달
// - client는 axios interceptor를 통해 로컬 스토리지의 토큰을 헤더에 탑재
// - 그러나 서버에서는 로컬 스토리지를 읽지 못함

import { API_URL } from '@/constants/env';
import { getCookieHeader } from '@/utils/server/getCookieHeader.server';
import { GetFavoriteWorkersParams } from './favorite/favorite.api';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';

// - 따라서 직접 headers에 토큰(cookieHeader)을 설정해야 함
const getFavoriteWorkersServer = async (param: GetFavoriteWorkersParams) => {
  // 모든 값을 string으로 변환
  const query = new URLSearchParams(
    Object.entries(param).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/favorite?${query}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getFavoriteWorkersServer 실패', text);
    throw new Error(`Failed to fetch favorites: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const getWorkerProfilesServer = async (params: WorkerSearchParams) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/profile/workers?${queryString}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getWorkerProfilesServer 실패', text);
    throw new Error(`Failed to fetch worker profiles: ${res.status}`);
  }

  return res.json();
};

interface GetReviewableEstimatesServerParams {
  page: number;
  pageSize: number;
}

const getReviewableEstimatesServer = async (params: GetReviewableEstimatesServerParams) => {
  const queryParams = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/estimate/reviewable?${queryParams}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getReviewableEstimatesServer 실패', text);
    throw new Error(`Failed to fetch reviewable estimates: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

interface GetMyWrittenReviewsServerParams {
  page: number;
  pageSize: number;
}

const getMyWrittenReviewsServer = async (
  cookieHeaderString: string,
  params: GetMyWrittenReviewsServerParams,
) => {
  const { page, pageSize } = params;

  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  }).toString();

  const res = await fetch(`${API_URL}/review?${queryParams}`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeaderString,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getMyWrittenReviewsServer 실패:', text, 'Status:', res.status);
    throw new Error(`Failed to fetch written reviews: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

async function getUserMeServer() {
  const cookieHeader = await getCookieHeader();
  const res = await fetch(`${API_URL}/user/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include', // <- 쿠키도 필요하면 이 옵션 유지
    cache: 'no-store', // Next.js에서 SSR fetch할 때는 이걸 붙여줘야 즉시 데이터 받음
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SSR getUserMeServer fetch 실패', text);
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  const user = await res.json();
  return user;
}

const serverApi = {
  getFavoriteWorkersServer,
  getWorkerProfilesServer,
  getReviewableEstimatesServer,
  getMyWrittenReviewsServer,
  getUserMeServer,
};

export default serverApi;
