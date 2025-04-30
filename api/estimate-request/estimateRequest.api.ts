import {
  CreateEstimateRequestDto,
  ReceivedEstimateRequestSearchParams,
} from "@/types/dtos/estimateRequest.dto";
import { client, errorHandler } from "../client";
import { API_URL } from "@/constants/env";

const createEstimateRequest = async (data: CreateEstimateRequestDto) => {
  try {
    const url = "/estimate-request";
    const response = await client.post(url, data);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getReceivedEstimateRequests = async (
  params: ReceivedEstimateRequestSearchParams
) => {
  try {
    const url = "/estimate-request/received";
    const response = await client.get(url, { params });
    return response.data;
  } catch (e) {
    throw e;
  }
};

const getReceivedEstimateRequestsSever = async (
  params: ReceivedEstimateRequestSearchParams,
  cookieHeader: string
) => {
  try {
    const response = await client.get(`${API_URL}/estimate-request/received`, {
      params,
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

const estimateRequestApi = {
  createEstimateRequest,
  getReceivedEstimateRequests,
  getReceivedEstimateRequestsSever,
};

export default estimateRequestApi;
