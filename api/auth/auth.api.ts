import { LogInDto, SignUpDto } from '@/types/dtos/auth.dto';
import { client, errorHandler } from '../client';

// 회원가입
const singUp = async (dto: SignUpDto) => {
  const url = '/auth/sign-up';
  const response = await client.post(url, dto);
  return response.data;
};

// 로그인
const logIn = async (dto: LogInDto) => {
  const url = '/auth/log-in';
  const response = await client.post(url, dto);

  return response.data;
};

// 로그아웃 (refreshToken 무효화)
const logOut = async () => {
  try {
    const url = '/auth/log-out';
    await client.delete(url); // refreshToken은 쿠키로 자동 전송됨
  } catch (error) {
    errorHandler(error);
  }
};

// 토큰 재발급
const refreshToken = async () => {
  try {
    const url = '/auth/refresh-token';
    const response = await client.post(url, {}, { withCredentials: true }); // refreshToken은 쿠키로 자동 전송됨
    const { accessToken } = response.data;
    console.log('refreshToken api accessToken', accessToken);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// const MOCK_REDIRECT_URL = 'http://localhost:3000/auth/callback?code=fakeCode';

// 소셜 로그인
const handleOAuthLogin = (provider: 'google' | 'kakao' | 'naver') => {
  console.log(provider); // never used 에러 방지용
  // window.location.href = MOCK_REDIRECT_URL;
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
};

const authApi = {
  singUp,
  logIn,
  logOut,
  refreshToken,
  handleOAuthLogin,
};

export default authApi;
