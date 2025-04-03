import { User } from '../entities/user.entity';

// 회원가입 요청 시 사용합니다.
export type SignUpDto = Pick<
  User,
  'name' | 'email' | 'phoneNumber' | 'password' | 'passwordConfirm' | 'role'
>;

// 로그인 요청 시 사용합니다.
export type LogInDto = Pick<User, 'email' | 'password' | 'role'>;

// 토큰 갱신 요청 시 사용합니다.
export type RefreshTokenDto = Pick<User, 'refreshToken'>;

/* ------------------- 백엔드 API 비교 완료 --------------------- */
