import { Estimate } from '../entities/estimate.entity';

// 기사님이 '견적 보내기' 모달에서 '견적 보내기' 버튼을 누를 때 전송하는 데이터 타입입니다.
// 참고: query parameter로 customerId를 전달합니다.
export type CreateGeneralEstimateDto = Pick<Estimate, 'price'>;

// 기사님이 '요청 반려' 모달에서 '반려하기' 버튼을 누를 때 전송하는 데이터 타입입니다.
// 참고: query parameter로 estimateId를 전달합니다.
export type RejectEstimateRequestDto = Pick<Estimate, 'rejectionMessage'>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */

export type FilterReceivedEstimateList = '전체' | '확정한 견적서';
