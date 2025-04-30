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

const favoriteApi = {
  getFavoriteWorkers,
};

export default favoriteApi;
