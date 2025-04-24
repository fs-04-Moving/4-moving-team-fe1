'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { createWorkerProfileValiation } from '@/constants/formValidation';
import { CreateWorkerProfileDto } from '@/types/dtos/profile.dto';
import { ServiceTypeEng } from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateProfileMutation } from '@/hooks/useCreateProfileMutation';
import { useRouter } from 'next/navigation';
import ButtonOutlined from '../atoms/ButtonOutlined';
import ButtonSolid from '../atoms/ButtonSolid';
import DividerHor from '../atoms/DividerHor';
import Loader from '../atoms/Loader';
import GroupDescriptionInput from '../organisms/GroupDescriptionInput';
import GroupExperienceInput from '../organisms/GroupExperienceInput';
import GroupNicknameInput from '../organisms/GroupNicknameInput';
import GroupProfileImageInput from '../organisms/GroupProfileImageInput';
import GroupRegionSelect from '../organisms/GroupRegionSelect';
import GroupServiceTypeSelect from '../organisms/GroupServiceTypeSelector';
import GroupSummaryInput from '../organisms/GroupSummaryInput';

export interface FormProfileInput {
  profileImage: File | null;
  nickname: string;
  experience: string;
  summary: string;
  description: string;
}

interface FormProfileWorkerProps {
  initialProfile?: {
    profileImage?: string;
    nickname: string;
    experience: string;
    summary: string;
    description: string;
    services: ServiceTypeEng[];
    serviceAreas: Area[];
  };
}

function FormProfileWorker({ initialProfile }: FormProfileWorkerProps) {
  const { control, handleSubmit, formState, reset, trigger } =
    useForm<FormProfileInput>({
      defaultValues: {
        profileImage: null,
        nickname: initialProfile?.nickname ?? '',
        experience: initialProfile?.experience ?? '',
        summary: initialProfile?.summary ?? '',
        description: initialProfile?.description ?? '',
      },
      mode: 'onBlur',
      resolver: zodResolver(createWorkerProfileValiation),
    });

  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [serviceAreas, setServiceAreas] = useState<Area[]>(['seoul']);

  useEffect(() => {
    if (initialProfile) {
      reset({
        profileImage: null,
        nickname: initialProfile.nickname,
        experience: initialProfile.experience.toString(), // 백엔드에서 오는 값은 number
        summary: initialProfile.summary,
        description: initialProfile.description,
      });
      // isValid 검사를 수행하여 버튼을 활성화하기 위해
      trigger();

      setServices((prev) => [...prev, ...initialProfile.services]);
      setServiceAreas((prev) => [...prev, ...initialProfile.serviceAreas]);
    }
    setIsInitializing(false);
  }, [initialProfile, reset, trigger]);

  const { mutate: submitProfile } = useCreateProfileMutation(
    initialProfile
      ? profilesApi.updateWorkerProfile
      : profilesApi.createWorkerProfile
  );

  const handleClickSubmit = (inputData: FormProfileInput) => {
    setIsProcessing(true);
    const data: CreateWorkerProfileDto = {
      ...inputData,
      services,
      serviceAreas,
    };
    submitProfile(data);
  };

  const handleClickCancel = () => {
    router.back();
  };

  const isEnabledButton =
    formState.isValid &&
    services.length > 0 &&
    serviceAreas.length > 0 &&
    !isProcessing;

  if (isInitializing) return null;

  return (
    <form onSubmit={handleSubmit(handleClickSubmit)}>
      <div className="lg:flex lg:gap-18">
        <div className="w-full">
          <GroupProfileImageInput
            control={control}
            defaultImageUrl={initialProfile?.profileImage}
          />
          <GroupNicknameInput control={control} />
          <GroupExperienceInput control={control} />
          <GroupSummaryInput control={control} />
        </div>
        <div className="w-full">
          <div className="lg:hidden">
            <DividerHor />
          </div>
          <GroupDescriptionInput control={control} />
          <GroupServiceTypeSelect
            services={services}
            setServices={setServices}
            title1="제공 서비스"
            title2="* 중복 선택 및 수정 가능"
          />
          <GroupRegionSelect
            selectedRegion={serviceAreas}
            onRegionSelect={setServiceAreas}
            multipleSelect
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-2 lg:gap-8">
          {initialProfile && (
            <ButtonOutlined
              onClick={handleClickCancel}
              className="lg:w-[684px]"
            >
              취소
            </ButtonOutlined>
          )}
          <ButtonSolid disabled={!isEnabledButton} className="lg:w-[684px]">
            {isProcessing ? (
              <Loader />
            ) : initialProfile ? (
              '수정하기'
            ) : (
              '시작하기'
            )}
          </ButtonSolid>
        </div>
      </div>
    </form>
  );
}

export default FormProfileWorker;
