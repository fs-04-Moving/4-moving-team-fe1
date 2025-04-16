'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { useCreateProfileMutation } from '@/hooks/useCreateProfileMutation';
import { CreateCustomerProfileDto } from '@/types/dtos/profile.dto';
import { ServiceTypeEng } from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { AreaType } from '@/types/move.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import DividerHor from '../atoms/DividerHor';
import Loader from '../atoms/Loader';
import GroupProfileImageInput from '../organisms/GroupProfileImageInput';
import GroupRegionSelect from '../organisms/GroupRegionSelect';
import GroupServiceTypeSelect from '../organisms/GroupServiceTypeSelector';

export interface FormProfileInput {
  profileImage: File | null;
}

function FormProfileCustomer() {
  const { control, handleSubmit, formState } = useForm<FormProfileInput>({
    defaultValues: { profileImage: null },
    mode: 'onChange',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [livingArea, setLivingArea] = useState<Area>('seoul');

  const handleRegionSelect = (region: keyof AreaType) => {
    setLivingArea(region);
  };

  const isEnabledButton =
    formState.isValid && services.length !== 0 && !!livingArea && !isProcessing;

  const { mutate: createCustomerProfile } = useCreateProfileMutation(
    profilesApi.createCustomerProfile
  );

  const handleClickStart = (inputData: FormProfileInput) => {
    setIsProcessing(true);
    const data: CreateCustomerProfileDto = {
      profileImage: inputData.profileImage,
      services,
      livingArea,
    };
    createCustomerProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(handleClickStart)}>
      <GroupProfileImageInput control={control} />
      <GroupServiceTypeSelect
        services={services}
        setServices={setServices}
        title1="이용 서비스"
        title2="* 중복 선택 및 수정 가능, 견적 요청 시 선택 가능"
      />
      <DividerHor />
      <GroupRegionSelect
        selectedRegion={livingArea}
        onRegionSelect={handleRegionSelect}
      />
      <ButtonSolid disabled={!isEnabledButton}>
        {isProcessing ? <Loader /> : '시작하기'}
      </ButtonSolid>
    </form>
  );
}

export default FormProfileCustomer;
