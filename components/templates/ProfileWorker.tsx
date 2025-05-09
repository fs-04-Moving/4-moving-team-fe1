'use client';

import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import FormProfileWorker from './FormProfileWorker';

function ProfileWorker() {
  return (
    <div className="flex flex-col w-[327px] lg:w-[1400px]">
      <Label>기사님 프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-12 mb-10 lg:mb-16">
        <FormProfileWorker />
      </div>
    </div>
  );
}

export default ProfileWorker;
