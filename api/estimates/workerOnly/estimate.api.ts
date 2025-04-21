import { client, errorHandler } from "@/api/client";
import { ReceivedEstimateListResponse } from "../estimate";

// 반려된 견적들 가져오기
export const getRejectEstimates = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await client.get("/estimate/reject", {
      params: { page, pageSize },
    });
    return response.data; // list, totalCount 포함
  } catch (error) {
    errorHandler(error);
  }
};

export const getReceivedEstimates = async ({
  estimateRequestId,
  page,
  pageSize,
}: {
  estimateRequestId: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await client.get<ReceivedEstimateListResponse>(
      `/estimate/received/${estimateRequestId}`,
      {
        params: { page, pageSize },
      }
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};
