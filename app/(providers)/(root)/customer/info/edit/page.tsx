'use client';

import userApi from '@/api/user/user.api';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import CustomerInfoEditTemplate from '@/components/templates/CustomerInfoEditTemplate';
import { useCustomerInfoQuery } from '@/hooks/useCustomerInfoQuery';
import { UpdateUserInfoDto } from '@/types/dtos/user.dto';
import { useMutation } from '@tanstack/react-query';

function CustomerInfoEditPage() {
  const { data, isLoading, isError } = useCustomerInfoQuery();

  const mutation = useMutation({
    mutationFn: userApi.updateUserInfo,
    onSuccess: () => {
      alert('정보가 성공적으로 수정되었습니다.');
    },
    onError: () => {
      alert('정보 수정에 실패했습니다. 비밀번호를 확인해 주세요.');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;

  const defaultValues: UpdateUserInfoDto = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const onSubmit = (formData: UpdateUserInfoDto) => {
    console.log('formdData in onSubmit', formData);
    mutation.mutate(formData);
  };

  return (
    <CustomerInfoEditTemplate
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
}

export default CustomerInfoEditPage;
