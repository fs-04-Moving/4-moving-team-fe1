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
    throw error; // error를 던져줘야 useQuery에서 error handling이 가능해져
  }
};

const getFavoriteWorkersServer = async (accessToken: string) => {
  const response = await client.get('/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // SSR이니까 쿠키도 같이 보내야 할 수도 있음
    withCredentials: true,
  });
  return response.data;
};

const favoriteApi = {
  getFavoriteWorkers,
  getFavoriteWorkersServer,
};

export default favoriteApi;
