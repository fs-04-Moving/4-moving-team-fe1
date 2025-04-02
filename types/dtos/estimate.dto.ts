import { Estimate } from '../entities/estimate.entity';

export type FilterReceivedEstimateList = '전체' | '확정한 견적서';

// 고객의 '대기 중인 견적' 목록에 사용합니다.
export type CustomerPendingEstimateListDto = Omit<
  Estimate,
  'requestDate' | 'workerSummary'
>;

// 고객의 '견적 상세' 페이지에 사용합니다.
export type CustomerEstimateDetailDto = Estimate;

// 고객의 '받았던 견적' 목록 중 '견적 정보'에 대한 '견적서 목록'에 사용합니다.
export type CustomerReceivedEstimateListDto = Omit<
  Estimate,
  'movingDate' | 'departure' | 'destination' | 'requestDate'
>;

// 고객의 '작성 가능한 리뷰' 목록에 사용합니다.
export type CustomerEnabledReviewListDto = Pick<
  Estimate,
  | 'workerProfileImage'
  | 'workerNickname'
  | 'movingDate'
  | 'price'
  | 'serviceType'
>;

// 기사님의 '견적 보내기', '요청 반려' 모달에서 사용합니다. (모달에 표시할 정보)
export type SendEstimateOrRejectRequestModalDto =
  | Pick<
      Estimate,
      | 'serviceType'
      | 'customerName'
      | 'movingDate'
      | 'departure'
      | 'destination'
    >
  | { isAssigned: boolean };

// 기사님이 '견적 보내기' 모달에서 '견적 보내기' 버튼을 누를 때 전송하는 데이터 타입입니다.
// 백엔드 확정 시 작성 예정(2025.04.02)
// export type SendEstimateDto

// 기사님이 '요청 반려' 모달에서 '반려하기' 버튼을 누를 때 전송하는 데이터 타입입니다.
// 백엔드 확정 시 작성 예정(2025.04.02)
// export type RejectRequestDto

// 기사님의 '보낸 견적 조회' 목록에 사용합니다.
export type SendedEstimateListDto =
  | Pick<
      Estimate,
      | 'id'
      | 'serviceType'
      | 'status'
      | 'customerName'
      | 'movingDate'
      | 'departure'
      | 'destination'
      | 'price'
    >
  | { isAssigned: boolean };

// 기사님의 '반려 요청' 목록에 사용합니다.
export type RejectEstimateListDto = Omit<SendedEstimateListDto, 'status'>;
