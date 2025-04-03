import { UserLogInDto, UserSignUpDto } from '@/types/dtos/user.dto';
import { client, errorHandler } from '../client';

// 회원가입
const singUp = async (dto: UserSignUpDto) => {
  const url = '/auth/sign-up';
  const response = await client.post(url, dto);

  return response.data;
};

// 로그인
const logIn = async (dto: UserLogInDto) => {
  const url = '/auth/log-in';
  const response = await client.post(url, dto);

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};

// 토큰 재발급
const refreshToken = async (prevRefreshToken: string) => {
  try {
    const url = '/users/refresh-token';
    const response = await client.post(url, { prevRefreshToken });

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 닉네임 중복 체크
const checkIsAvailableNickname = async (nickname: string) => {
  try {
    const url = '/users/check-nickname';
    const response = await client.post(url, nickname);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 내 정보 조회
const getMe = async () => {
  try {
    const url = '/users/me';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const usersApi = {
  singUp,
  logIn,
  refreshToken,
  checkIsAvailableNickname,
  getMe,
};

export default usersApi;
