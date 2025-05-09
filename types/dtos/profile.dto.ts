import { User } from '../entities/user.entity';

// 고객의 프로필 생성 시 사용합니다.
export type CreateCustomerProfileDto = Pick<User, 'livingArea' | 'services'> & {
  profileImage?: File | null;
};

// // 고객의 프로필 수정 시 사용합니다.
export type UpdateCustomerProfileDto = Partial<CreateCustomerProfileDto>;

// // 기사님의 프로필 생성 시 사용합니다.
export type CreateWorkerProfileDto = Pick<
  User,
  'serviceAreas' | 'services' | 'nickname' | 'experience' | 'summary' | 'description'
> & { profileImage?: File | null };

// // 기사님의 프로필 수정 시 사용합니다.
export type UpdateWorkerProfileDto = Partial<CreateWorkerProfileDto>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */
