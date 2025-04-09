'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { CreateWorkerProfileDto } from '@/types/dtos/profile.dto';
import { ServiceTypeEng } from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { handleProfileSuccess } from '@/utils/handlerUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import FormProfileWorker from './FormProfileWorker';

function ProfileWorker() {
  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [serviceAreas, setServiceAreas] = useState<Area[]>(['seoul']);
  const [isProcessing, setIsProcessing] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createWorkerProfile } = useMutation({
    mutationFn: (data: CreateWorkerProfileDto) =>
      profilesApi.createWorkerProfile(data),
    onSuccess: async (res) => {
      await handleProfileSuccess({
        accessToken: res.accessToken,
        router,
        queryClient,
      });
      setIsProcessing(false);
    },
  });

  return (
    <div className="flex flex-col w-[327px] lg:w-[1400px] mt-10 lg:mt-15">
      <Label>기사님 프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-12">
        <div className="mb-10 lg:mb-12">
          <FormProfileWorker
            services={services}
            setServices={setServices}
            serviceAreas={serviceAreas}
            setServiceAreas={setServiceAreas}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            createWorkerProfile={createWorkerProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileWorker;
