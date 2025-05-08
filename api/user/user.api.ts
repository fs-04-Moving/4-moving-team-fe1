import { UpdateUserInfoDto } from '@/types/dtos/user.dto';
import { client, errorHandler } from '../client';

// 내 정보 조회
const getUserMe = async () => {
  // if (typeof window === 'undefined') {
  //   // SSR에서는 axios 말고, getUserMeServer를 사용하도록 유도
  //   throw new Error('getUserMe는 클라이언트에서만 사용 가능합니다.');
  // }
  try {
    const url = '/user/me';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 내 기본 정보 조회
const getUserInfo = async () => {
  if (typeof window === 'undefined') {
    throw new Error('getUserInfo는 클라이언트에서만 사용 가능합니다.');
  }
  try {
    const url = '/user/info';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const updateUserInfo = async (dto: UpdateUserInfoDto) => {
  try {
    console.log('dto', dto);
    const url = '/user';
    const response = await client.put(url, dto);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const userApi = {
  getUserMe,
  getUserInfo,
  updateUserInfo,
};

export default userApi;
