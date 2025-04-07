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

  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken); // accessToken만 저장

  return response.data;
};

// 로그아웃 (refreshToken 무효화)
const logOut = async () => {
  try {
    const url = '/auth/log-out';
    await client.post(url); // refreshToken은 쿠키로 자동 전송됨
  } catch (error) {
    errorHandler(error);
  }
};

// 토큰 재발급
const refreshToken = async () => {
  try {
    const url = '/auth/refresh-token';
    const response = await client.post(url); // refreshToken은 쿠키로 자동 전송됨

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 내 정보 조회
const getUserMe = async () => {
  if (typeof window === 'undefined') {
    // SSR에서는 axios 말고, getUserMeServer를 사용하도록 유도
    throw new Error('getUserMe는 클라이언트에서만 사용 가능합니다.');
  }
  try {
    const url = '/user/me';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const usersApi = {
  singUp,
  logIn,
  logOut,
  refreshToken,
  getUserMe,
};

export default usersApi;

// import { LogInDto, RefreshTokenDto, SignUpDto } from '@/types/dtos/auth.dto';
// import { client, errorHandler } from '../client';

// // 회원가입
// const singUp = async (dto: SignUpDto) => {
//   const url = '/auth/sign-up';
//   const response = await client.post(url, dto);

//   return response.data;
// };

// // 로그인
// const logIn = async (dto: LogInDto) => {
//   const url = '/auth/log-in';
//   const response = await client.post(url, dto);

//   const { accessToken, refreshToken } = response.data;

//   localStorage.setItem('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);

//   return response.data;
// };

// // 토큰 재발급
// const refreshToken = async (prevRefreshToken: RefreshTokenDto | string) => {
//   try {
//     const url = '/auth/refresh-token';
//     const response = await client.post(url, { prevRefreshToken });

//     const { accessToken, refreshToken } = response.data;

//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);

//     return response.data;
//   } catch (error) {
//     errorHandler(error);
//   }
// };

// // 내 정보 조회
// const getUserMe = async () => {
//   try {
//     const url = '/user/me';
//     const response = await client.get(url);

//     return response.data;
//   } catch (error) {
//     errorHandler(error);
//   }
// };

// const usersApi = {
//   singUp,
//   logIn,
//   refreshToken,
//   getUserMe,
// };

// export default usersApi;
