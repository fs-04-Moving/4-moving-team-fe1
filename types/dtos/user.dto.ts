export interface UserSignUpDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  role: Role;
}

export type UserLogInDto = Omit<
  UserSignUpDto,
  'name' | 'phoneNumber' | 'passwordConfirm'
>;

export type Role = 'user' | 'worker';
