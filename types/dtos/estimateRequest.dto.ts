import { EstimateRequest } from '../entities/estimateRequest.entity';

// 고객이 '견적 요청'을 생성할 때 사용합니다.
export type CreateEstimateRequest = Pick<
  EstimateRequest,
  'serviceType' | 'movingDate' | 'departureArea' | 'destination'
>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */
