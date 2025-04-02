import { EstimateRequest } from '../entities/estimateRequest.entity';

// 고객의 '받았던 견적' 목록 중 '견적 정보'에 사용합니다.
export type CustomerRequestListDto = Omit<EstimateRequest, 'isAssigned'>;

// 기사님의 '받은 요청' 목록에 사용합니다.
export type WorkerRequestListDto = EstimateRequest;
