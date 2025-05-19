import { LogInDto, SignUpDto } from '@/types/dtos/auth.dto';
import { Role } from '@/types/entities/user.entity';
import { generateOAuthState } from '@/utils/oauth/oauthUserHelpers';
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

// 소셜 로그인
const handleOAuthLogin = (role: Role | null, provider: 'google' | 'kakao' | 'naver') => {
  if (!role) return;

  const state = generateOAuthState(role);
  const redirectUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }auth/${provider}?state=${encodeURIComponent(state)}`;

  window.location.href = redirectUrl;
};

// 액세스 토큰 쿠키에 저장
const setAccessToken = (accessToken: string) =>
  fetch('/auth/set-access-token', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ accessToken }),
  });

const authApi = {
  singUp,
  logIn,
  logOut,
  refreshToken,
  handleOAuthLogin,
  setAccessToken,
};

export default authApi;
