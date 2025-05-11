import { WorkerCardInLikedProps } from '@/components/organisms/WorkerCardInLiked';
import { client, errorHandler } from '../client';

export type FavoriteWorkersResponse = {
  list: WorkerCardInLikedProps[];
  totalCount: number;
};

/**
 * 작업자에게 좋아요를 누르는 API
 * @param workerId - 작업자 ID
 */
export async function createFavorite(workerId: string): Promise<void> {
  try {
    await client.post(`/favorite/${workerId}`);
  } catch (error) {
    errorHandler(error);
  }
}

// 찜한 기사님 목록을 조회하는 API
// 페이지네이션을 위해 page와 pageSize를 파라미터로 받습니다.

export interface GetFavoriteWorkersParams {
  page?: number;
  pageSize?: number;
}
const getFavoriteWorkers = async (params?: GetFavoriteWorkersParams) => {
  try {
    const url = '/favorite';
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error; //
  }
};

/**
 * 특정 작업자의 좋아요 수를 조회합니다.
 * @param workerId 작업자 ID
 * @returns 좋아요 수 (number)
 */
async function getFavoriteCountByWorkerId(workerId: string): Promise<number> {
  try {
    const response = await client.get(`/favorite/${workerId}`);
    const data = response.data;

    // 서버에서 단순 숫자를 반환한다고 가정
    return typeof data === 'number' ? data : Number(data.count ?? 0);
  } catch (error) {
    errorHandler(error);
    return 0;
  }
}

/**
 * 작업자에게 좋아요를 취소하는 API
 * @param workerId - 작업자 ID
 */
export async function deleteFavorite(workerId: string): Promise<void> {
  try {
    await client.delete(`/favorite/${workerId}`);
  } catch (error) {
    errorHandler(error);
  }
}

const favoriteApi = {
  createFavorite,
  deleteFavorite, // ✅ 추가
  getFavoriteWorkers,
  getFavoriteCountByWorkerId,
};

export default favoriteApi;
