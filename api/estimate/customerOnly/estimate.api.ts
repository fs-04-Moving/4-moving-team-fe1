// api/estimate/customerOnly/estimate.api.ts

import { client, errorHandler } from "@/api/client";
import { Estimate } from "@/types/entities/estimate.entity";

export type GetPendingEstimates = {
  estimates: Estimate[];
  totalCount: number;
};

/**
 * 대기중인 견적 데이터를 조회하는 API
 * @param page - 페이지 번호 (1부터 시작)
 * @param pageSize - 페이지 크기
 * @returns 대기중인 견적 리스트 및 전체 개수
 */
export async function getPendingEstimate(
  page: number,
  pageSize: number
): Promise<GetPendingEstimates> {
  try {
    const response = await client.get("estimate/pending", {
      params: { page, pageSize },
    });

    const data = response.data;

    return {
      estimates: data.list as Estimate[],
      totalCount: data.totalCount,
    };
  } catch (error) {
    errorHandler(error);
    return { estimates: [], totalCount: 0 };
  }
}

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
