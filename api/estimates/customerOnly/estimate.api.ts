// /api/estimates/workerOnly/estimate.api.ts

import { client, errorHandler } from "@/api/client";
import { Estimate } from "@/types/entities/estimate.entity";

interface GetPendingEstimateResponse {
  list: Estimate[];
  totalCount: number;
}

export const getPendingEstimates = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<GetPendingEstimateResponse | undefined> => {
  try {
    const response = await client.get<GetPendingEstimateResponse>(
      "/estimate/pending",
      {
        params: { page, pageSize },
      }
    );

    return response.data;
  } catch (error) {
    errorHandler(error);
    return;
  }
};

interface GetReceivedEstimatesResponse {
  list: Estimate[];
  totalCount: number;
}

export const getReceivedEstimates = async ({
  estimateRequestId,
  page,
  pageSize,
}: {
  estimateRequestId: string;
  page: number;
  pageSize: number;
}): Promise<GetReceivedEstimatesResponse | undefined> => {
  try {
    const response = await client.get<GetReceivedEstimatesResponse>(
      `/estimate/received/${estimateRequestId}`,
      {
        params: {
          page,
          pageSize,
        },
      }
    );

    return response.data;
  } catch (error) {
    errorHandler(error);
    return;
  }
};

export const getEstimateDetailByCustomer = async (
  estimateId: string
): Promise<Estimate | undefined> => {
  try {
    const response = await client.get<Estimate>(
      `/estimate/customer/detail/${estimateId}`
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
    return;
  }
};

//견적 확정하기

// types/entities/estimate.entity.ts (또는 별도 타입 파일)
interface ConfirmEstimateResponse {
  success: boolean;
  message?: string;
}

export const confirmEstimateByCustomer = async (
  estimateId: string
): Promise<ConfirmEstimateResponse | undefined> => {
  try {
    const response = await client.post<ConfirmEstimateResponse>(
      `/estimate/customer/confirm/${estimateId}`
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
    return;
  }
};
