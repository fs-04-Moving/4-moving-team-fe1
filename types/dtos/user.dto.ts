import { User } from '../entities/user.entity';

// 사용자 기본 정보 수정 시 사용합니다.
export type UpdateUserInfoDto = Pick<
  User,
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'password'
  | 'passwordConfirm'
  | 'newPassword'
>;

// 로그인한 사용자의 정보를 가져옵니다.
export type GetUserMeDto = Pick<User, 'name' | 'profileImage' | 'hasProfile'>;

// (고객/기사님 공통) '기본정보 수정' 페이지에 사용합니다.
export type UserInfoEditDto = Pick<User, 'name' | 'email' | 'phoneNumber'>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */
