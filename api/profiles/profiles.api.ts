import { CreateCustomerProfileDto } from '@/types/dtos/profile.dto';
import { client, errorHandler } from '../client';

// 고객 프로필 생성
const createCustomerProfile = async (data: CreateCustomerProfileDto) => {
  try {
    const { livingArea, services, profileImage } = data;
    const formData = new FormData();
    formData.append('livingArea', livingArea);
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

const profilesApi = {
  createCustomerProfile,
};

export default profilesApi;
