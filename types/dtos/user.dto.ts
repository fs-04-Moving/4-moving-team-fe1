import { User } from '../entities/user.entity';

// 사용자 기본 정보 수정 시 사용합니다.
export type UpdateUserInfoDto = Pick<User, 'name' | 'email' | 'phoneNumber' | 'password'> &
  Partial<Pick<User, 'newPassword' | 'newPasswordConfirm'>>;

export interface Worker {
  workerId: number;
  profileImage: string;
  experience: number;
  nickname: string;
  services: string[];
  serviceAreas: string[];
  reviewCount: number;
  favoriteCount: number;
  avgStar: number;
  confirmedEstimateCount: number;
}

// (고객/기사님 공통) '기본정보 수정' 페이지에 사용합니다.
export type UserInfoEditDto = Pick<User, 'name' | 'email' | 'phoneNumber'>;

// 로그인 사용자 정보
export type GetUserMe = Pick<
  User,
  'name' | 'hasProfile' | 'role' | 'hasRequest' | 'profileImage' | 'sub'
>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */
