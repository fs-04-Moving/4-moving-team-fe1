'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { useAuth } from '@/contexts/AuthContext';
import useHasFinishedSsr from '@/hooks/useHasFinishedSsr';
import { useQuery } from '@tanstack/react-query';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import FormProfileCustomer from './FormProfileCustomer';

function ProfileCustomerEdit() {
  const hasFinishedSsr = useHasFinishedSsr();
  const { isAuthInitialized } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profilesApi.getCustomerProfileMe,
  });
  if (!hasFinishedSsr || !isAuthInitialized) return null;

  return (
    <div className="flex flex-col w-[327px] lg:w-[640px] mt-10 lg:mt-15">
      <Label>프로필 수정</Label>
      <DividerHor />
      <div className="mt-5 lg:mt-16 mb-10 lg:mb-16">
        <FormProfileCustomer initialProfile={profile} />
      </div>
    </div>
  );
}

export default ProfileCustomerEdit;
