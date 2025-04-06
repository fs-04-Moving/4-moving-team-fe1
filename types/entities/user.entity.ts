import { AreaType } from '../move.type';
import { ServiceTypeEng } from './estimate.entity';
import { EstimateRequest } from './estimateRequest.entity';
import { Review } from './review.entity';

// role과 상관없이 가질 수 있는 모든 속성 타입입니다.
// User, Profile 속성을 모두 포함합니다.
export interface User {
  id: string;
  name: string;
  email: string;
  encryptedPassword: string;
  password: string;
  passwordConfirm: string;
  newPassword: string;
  phoneNumber: string;
  profileImage: string;
  refreshToken: string;
  role: Role;
  hasProfile: boolean; // 프로필 작성 여부
  services: ServiceTypeEng[]; // 고객: 이용할 서비스 유형 목록, 기사: 제공할 서비스 유형 목록
  estimateRequests: EstimateRequest[]; // 고객: 요청 견적(이사) 목록
  livingArea?: Area; // 고객: 사는 지역
  isFavorite: boolean; // 기사: 로그인한 고객이 해당 기사를 찜했는지 여부
  reviewsEverage: number; // 기사: 받은 별점 평균
  reviewsCount: number; // 기사: 받은 리뷰 개수
  reviews: Review[]; // 기사: 받은 리뷰 목록
  favoritesCount: number; // 기사: 받은 찜 횟수
  confirmedEstimatesCount: number; // 기사: 확정을 받은 견적 개수
  nickname: string; // 기사: 별명
  experience: number; // 기사: 경력
  summary: string; // 기사: 한 줄 요약
  description: string; // 기사: 상세 설명
  serviceAreas: Area[]; // 기사: 서비스 가능 지역 목록
}

export type Role = 'customer' | 'worker';

export type Area = keyof AreaType;
