'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { useQuery } from '@tanstack/react-query';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import FormProfileWorker from './FormProfileWorker';

function ProfileWorkerEdit() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profilesApi.getWorkerProfileMe,
  });
  console.log(profile);
  return (
    <div className="flex flex-col w-[327px] lg:w-[1400px] mt-10 lg:mt-15">
      <Label>프로필 수정</Label>
      <DividerHor />
      <div className="mt-5 lg:mt-12 mb-10 lg:mb-16">
        <FormProfileWorker initialProfile={profile} />
      </div>
    </div>
  );
}

export default ProfileWorkerEdit;
