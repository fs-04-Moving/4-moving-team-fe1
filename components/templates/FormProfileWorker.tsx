'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { createWorkerProfileValiation } from '@/constants/formValidation';
import { CreateWorkerProfileDto } from '@/types/dtos/profile.dto';
import { ServiceTypeEng } from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateProfileMutation } from '@/hooks/useCreateProfileMutation';
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

function FormProfileWorker() {
  const { control, handleSubmit, formState } = useForm<FormProfileInput>({
    defaultValues: {
      profileImage: null,
      nickname: '',
      experience: '',
      summary: '',
      description: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(createWorkerProfileValiation),
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [serviceAreas, setServiceAreas] = useState<Area[]>(['seoul']);

  const { mutate: createWorkerProfile } = useCreateProfileMutation(
    profilesApi.createWorkerProfile
  );

  const handleClickStart = (inputData: FormProfileInput) => {
    setIsProcessing(true);
    const data: CreateWorkerProfileDto = {
      ...inputData,
      services,
      serviceAreas,
    };
    createWorkerProfile(data);
  };

  const isEnabledButton =
    formState.isValid &&
    services.length > 0 &&
    serviceAreas.length > 0 &&
    !isProcessing;

  return (
    <form
      onSubmit={handleSubmit(handleClickStart)}
      className="lg:flex lg:gap-18"
    >
      <div className="w-full">
        <GroupProfileImageInput control={control} />
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
        <ButtonSolid disabled={!isEnabledButton}>
          {isProcessing ? <Loader /> : '시작하기'}
        </ButtonSolid>
      </div>
    </form>
  );
}

export default FormProfileWorker;
