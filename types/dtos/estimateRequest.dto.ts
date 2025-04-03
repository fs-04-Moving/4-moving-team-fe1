import { EstimateRequest } from '../entities/estimateRequest.entity';

// 고객이 '견적 요청'을 생성할 때 사용합니다.
export type CreateEstimateRequest = Pick<
  EstimateRequest,
  'serviceType' | 'movingDate' | 'departure' | 'destination'
>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */

// 고객이 '견적 요청'을 삭제할 때에는 active 요청을 찾아서 삭제하므로 데이터 타입이 없음

// 고객의 '받았던 견적' 목록 중 '견적 정보'에 사용합니다.
export type GetCustomerRequestsDto = Omit<EstimateRequest, 'isAssigned'>;

// 기사님의 '받은 요청' 목록에 사용합니다.
export type GetWorkerRequestsDto = EstimateRequest;
