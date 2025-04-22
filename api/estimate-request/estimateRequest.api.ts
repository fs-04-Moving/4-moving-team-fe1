import { CreateEstimateRequestDto } from '@/types/dtos/estimateRequest.dto';
import { client, errorHandler } from '../client';

const createEstimateRequest = async (data: CreateEstimateRequestDto) => {
  try {
    const url = '/estimate-request';
    const response = await client.post(url, data);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const estimateRequestApi = {
  createEstimateRequest,
};

export default estimateRequestApi;
