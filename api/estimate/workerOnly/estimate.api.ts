// api/estimate/workerOnly/estimate.api.ts

import { client, errorHandler } from "@/api/client";
import {
  CreateGeneralEstimateDto,
  RejectEstimateRequestDto,
} from "@/types/dtos/estimate.dto";
import { Estimate, RawEstimate } from "@/types/entities/estimate.entity";

export interface GetSentEstimatesParams {
  page?: number;
  pageSize?: number;
}

export interface GetSentEstimatesResponse {
  list: Estimate[];
  totalCount: number;
}

export async function getSentEstimates(
  params: GetSentEstimatesParams = {}
): Promise<GetSentEstimatesResponse> {
  try {
    const response = await client.get<GetSentEstimatesResponse>(
      "/estimate/sent",
      { params }
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

// ✅ 추가된 상세 조회 함수
export async function getEstimateDetailByWorker(
  estimateId: string
): Promise<Estimate> {
  try {
    const response = await client.get<Estimate>(
      `/estimate/worker/detail/${estimateId}`
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

interface GetRejectedEstimatesResponseRaw {
  list: RawEstimate[];
  totalCount: number;
}

//반려된 견적들 조회 API
export async function getRejectedEstimates(
  params: GetSentEstimatesParams = {}
): Promise<GetSentEstimatesResponse> {
  try {
    const response = await client.get<GetSentEstimatesResponse>(
      "/estimate/reject",
      { params }
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

async function rejectEstimate(
  dto: RejectEstimateRequestDto,
  estimateId: string
) {
  try {
    await client.put(`/estimate/reject/${estimateId}`, dto);
    return;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

async function priceEstimate(
  dto: CreateGeneralEstimateDto,
  estimateId: string
) {
  try {
    await client.put(`/estimate/price/${estimateId}`, dto);
    return;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

async function createGeneralEstimate(
  dto: CreateGeneralEstimateDto,
  customerId: string
) {
  try {
    await client.post(`/estimate/general/${customerId}`, dto);
    return;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}

const workerEstimateApi = {
  rejectEstimate,
  priceEstimate,
  createGeneralEstimate,
};

export default workerEstimateApi;
