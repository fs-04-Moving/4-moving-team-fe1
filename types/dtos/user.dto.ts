export interface UserSignUpDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

export type UserLoginDto = Omit<
  UserSignUpDto,
  'name' | 'phoneNumber' | 'passwordConfirm'
>;
