import { API_URL } from '@/constants/env';
import {
  CreateCustomerProfileDto,
  CreateWorkerProfileDto,
  UpdateCustomerProfileDto,
  UpdateWorkerProfileDto,
} from '@/types/dtos/profile.dto';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';
import { client, errorHandler } from '../client';

// 고객 프로필 생성
const createCustomerProfile = async (data: CreateCustomerProfileDto) => {
  try {
    const { livingArea, services, profileImage } = data;
    const formData = new FormData();
    if (livingArea) {
      formData.append('livingArea', livingArea);
    }
    services.forEach((service) => formData.append('services', service));
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    const url = '/profile/customer';
    const response = await client.post(url, formData);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 고객 프로필 수정
const updateCustomerProfile = async (data: UpdateCustomerProfileDto) => {
  try {
    const { livingArea, services, profileImage } = data;
    const formData = new FormData();

    if (livingArea !== undefined) {
      formData.append('livingArea', livingArea);
    }

    if (services && Array.isArray(services)) {
      services.forEach((service) => {
        if (service) formData.append('services', service);
      });
    }

    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    }

    const url = '/profile/customer';
    const response = await client.put(url, formData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 기사 프로필 생성
const createWorkerProfile = async (data: CreateWorkerProfileDto) => {
  try {
    const {
      description,
      experience,
      nickname,
      serviceAreas,
      services,
      summary,
      profileImage,
    } = data;
    const formData = new FormData();
    formData.append('description', description);
    formData.append('experience', experience);
    formData.append('nickname', nickname);
    formData.append('summary', summary);
    serviceAreas.forEach((serviceArea) =>
      formData.append('serviceAreas', serviceArea)
    );
    services.forEach((service) => formData.append('services', service));
    if (profileImage) formData.append('profileImage', profileImage);

    const url = '/profile/worker';
    const response = await client.post(url, formData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 기사 프로필 수정
const updateWorkerProfile = async (data: UpdateWorkerProfileDto) => {
  try {
    const {
      description,
      experience,
      nickname,
      serviceAreas,
      services,
      summary,
      profileImage,
    } = data;

    const formData = new FormData();

    if (description !== undefined) {
      formData.append('description', description);
    }

    if (experience !== undefined) {
      formData.append('experience', experience);
    }

    if (nickname !== undefined) {
      formData.append('nickname', nickname);
    }

    if (summary !== undefined) {
      formData.append('summary', summary);
    }

    if (Array.isArray(serviceAreas)) {
      serviceAreas.forEach((area) => formData.append('serviceAreas', area));
    }

    if (Array.isArray(services)) {
      services.forEach((service) => formData.append('services', service));
    }

    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    }

    const url = '/profile/worker';
    const response = await client.put(url, formData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

//기사 프로필 가져오기
const getWorkerProfiles = async (params: WorkerSearchParams) => {
  try {
    const url = '/profile/workers';
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

const getWorkerProfilesServer = async (params: WorkerSearchParams) => {
  // const headers: Record<string, string> = accessToken
  //   ? { Authorization: `Bearer ${accessToken}` }
  //   : {};

  const response = await client.get(`${API_URL}/profile/workers`, {
    // headers,
    params,
    withCredentials: true,
  });
  return response.data;
};

// 고객 프로필 가져오기(프로필 수정용)
const getCustomerProfileMe = async () => {
  try {
    const url = '/profile/me/customer';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 기사 프로필 가져오기(프로필 수정용)
const getWorkerProfileMe = async () => {
  try {
    const url = '/profile/me/worker';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 기사 프로필 가져오기(마이페이지)
const getWorkerProfile = async (workerId: string) => {
  console.log('axios workerId', workerId);
  try {
    const url = `profile/worker/${workerId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const profilesApi = {
  createCustomerProfile,
  createWorkerProfile,
  getWorkerProfiles,
  getWorkerProfilesServer,
  getCustomerProfileMe,
  getWorkerProfileMe,
  updateCustomerProfile,
  updateWorkerProfile,
  getWorkerProfile,
};

export default profilesApi;
