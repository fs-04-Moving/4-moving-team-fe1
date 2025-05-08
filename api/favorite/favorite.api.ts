import { WorkerCardInLikedProps } from '@/components/organisms/WorkerCardInLiked';
import { client, errorHandler } from '../client';

export type FavoriteWorkersResponse = {
  list: WorkerCardInLikedProps[];
  totalCount: number;
};

const getFavoriteWorkers = async () => {
  try {
    const url = '/favorite';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

// 찜하기 API 추가
const createFavorite = async (workerId: string) => {
  try {
    const url = `/favorite/${workerId}`;
    const response = await client.post(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

// 찜 취소하기 API 추가
const deleteFavorite = async (workerId: string) => {
  try {
    const url = `/favorite/${workerId}`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

// 찜 상태 확인 API 추가
const checkFavorite = async (workerId: string) => {
  try {
    const url = `/favorite/check/${workerId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
    return false; // 에러 발생 시 기본값으로 false 반환
  }
};

const favoriteApi = {
  getFavoriteWorkers,
  createFavorite,
  deleteFavorite,
  checkFavorite,
};

export default favoriteApi;
