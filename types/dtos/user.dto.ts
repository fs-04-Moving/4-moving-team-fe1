import { Role, User } from '../entities/user.entity';

// 회원가입 요청 시 사용합니다.
export interface UserSignUpDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  role: Role;
}

// 로그인 요청 시 사용합니다.
export type UserLogInDto = Omit<
  UserSignUpDto,
  'name' | 'phoneNumber' | 'passwordConfirm'
>;

// '기사님 찾기' 페이지의 기사 목록에 사용합니다.
export type WorkerListDto = Pick<
  User,
  | 'id'
  | 'serviceTypes'
  | 'summary'
  | 'profileImage'
  | 'nickname'
  | 'reviewsCount'
  | 'reviewsEverage'
  | 'experience'
  | 'favoritesCount'
  | 'confirmedEstimatesCount'
>;

// 고객의 '기사님 상세 페이지'에 사용합니다.
export type WorkerDetailDto =
  | WorkerListDto
  | Pick<User, 'serviceAreas' | 'reviews'>;

// 고객의 '찜한 기사님 목록'에 사용합니다.
export type FavoriteWorkerList = Pick<
  User,
  | 'id'
  | 'nickname'
  | 'profileImage'
  | 'favoritesCount'
  | 'reviewsCount'
  | 'reviewsEverage'
  | 'experience'
  | 'confirmedEstimatesCount'
  | 'serviceAreas'
>;

// (고객/기사님 공통) '기본정보 수정' 페이지에 사용합니다.
export type UserInfoEditDto = Pick<User, 'name' | 'email' | 'phoneNumber'>;

// 기사 '프로필 등록/수정' 페이지에 사용합니다.
export type WorkerProfileDto = Pick<
  User,
  | 'nickname'
  | 'profileImage'
  | 'experience'
  | 'summary'
  | 'description'
  | 'serviceAreas'
  | 'serviceTypes'
>;

// 고객 '프로필 등록/ 수정' 페이지에 사용합니다.
export type CustomerProfileDto = Pick<
  User,
  'profileImage' | 'livingArea' | 'serviceTypes'
>;
