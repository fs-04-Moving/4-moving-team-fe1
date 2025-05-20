'use client';

import userApi from '@/api/user/user.api';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import UserInfoEditTemplate from '@/components/templates/UserInfoEditTemplate';
import { useUserInfoQuery } from '@/hooks/useUserInfoQuery';
import { UserInfoEditFormValues } from '@/types/dtos/user.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function UserInfoEditPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isError } = useUserInfoQuery();

  const mutation = useMutation({
    mutationFn: userApi.updateUserInfo,
    onSuccess: () => {
      Swal.fire({
        text: '정보가 성공적으로 수정되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(() => router.push('/'));
      queryClient.invalidateQueries({ queryKey: ['customerInfo'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => {
      Swal.fire({
        text: '정보 수정에 실패했습니다. 비밀번호를 확인해 주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;

  const defaultValues: UserInfoEditFormValues = {
    provider: data.provider,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: undefined,
    newPassword: undefined,
    newPasswordConfirm: undefined,
  };

  const onSubmit = (formData: UserInfoEditFormValues) => {
    mutation.mutate(formData);
  };

  return <UserInfoEditTemplate defaultValues={defaultValues} onSubmit={onSubmit} />;
}

export default UserInfoEditPage;
