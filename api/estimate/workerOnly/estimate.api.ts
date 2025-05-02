// api/estimate/workerOnly/estimate.api.ts

import { client, errorHandler } from "@/api/client";
import { Estimate } from "@/types/entities/estimate.entity";

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
