export interface UserSignUpDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

export type UserLogInDto = Omit<
  UserSignUpDto,
  'name' | 'phoneNumber' | 'passwordConfirm'
>;
