import { client, errorHandler } from '../client';

const getFavoriteWorkers = async () => {
  try {
    const url = '/favorite';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const favoriteApi = {
  getFavoriteWorkers,
};

export default favoriteApi;
