import {
  CreateCustomerProfileDto,
  CreateWorkerProfileDto,
} from '@/types/dtos/profile.dto';
import { client, errorHandler } from '../client';
import { WorkerSearchParams } from '@/types/dtos/Worker.dto';

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

//기사 프로필 가져오기
const getWorkerProfiles = async (params: WorkerSearchParams) => {
  try {
    const url = '/profile/workers';
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const profilesApi = {
  createCustomerProfile,
  createWorkerProfile,
  getWorkerProfiles,
};

export default profilesApi;
