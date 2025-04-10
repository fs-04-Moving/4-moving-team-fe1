'use client';

import { useAuth } from '@/contexts/AuthContext';
import useHasFinishedSsr from '@/hooks/useHasFinishedSsr';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import FormProfileCustomer from './FormProfileCustomer';

function ProfileCustomer() {
  const hasFinishedSsr = useHasFinishedSsr();
  const { isAuthInitialized } = useAuth();

  if (!hasFinishedSsr || !isAuthInitialized) return null;

  return (
    <div className="flex flex-col w-[327px] lg:w-[640px] mt-10 lg:mt-15">
      <Label>프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-16 mb-10 lg:mb-16">
        <FormProfileCustomer />
      </div>
    </div>
  );
}

export default ProfileCustomer;
