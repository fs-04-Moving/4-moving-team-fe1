import { EstimateRequest } from "../entities/estimateRequest.entity";
import { ServiceType } from "../move.type";

// 고객이 '견적 요청'을 생성할 때 사용합니다.
export type CreateEstimateRequestDto = Pick<
  EstimateRequest,
  "serviceType" | "movingDate" | "departureArea" | "destination" | "departure"
>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */

export interface ReceivedEstimateRequestSearchParams {
  serviceType?: ServiceType;
  orderBy?: string; // 여기 수정
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}

export interface InactiveEstimateRequest {
  createdAt: string | number | Date;
  id: string;
  requestDate: string;
  serviceType: ServiceType;
  movingDate: string;
  destination: string;
  departure: string;
}

export interface InactiveEstimateRequestResponse {
  list: InactiveEstimateRequest[];
  totalCount: number;
}
