'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { useCreateProfileMutation } from '@/hooks/useCreateProfileMutation';
import { CreateCustomerProfileDto } from '@/types/dtos/profile.dto';
import { ServiceTypeEng } from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { AreaType } from '@/types/move.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonOutlined from '../atoms/ButtonOutlined';
import ButtonSolid from '../atoms/ButtonSolid';
import DividerHor from '../atoms/DividerHor';
import Loader from '../atoms/Loader';
import GroupProfileImageInput from '../organisms/GroupProfileImageInput';
import GroupRegionSelect from '../organisms/GroupRegionSelect';
import GroupServiceTypeSelect from '../organisms/GroupServiceTypeSelector';

export interface FormProfileInput {
  profileImage: File | null | undefined;
}

interface FormProfileCustomerProps {
  initialProfile?: {
    profileImage?: string;
    services: ServiceTypeEng[];
    livingArea: Area;
  };
}

function FormProfileCustomer({ initialProfile }: FormProfileCustomerProps) {
  const { control, handleSubmit, formState } = useForm<FormProfileInput>({
    defaultValues: { profileImage: undefined },
    mode: 'onTouched',
  });

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [livingArea, setLivingArea] = useState<Area>('seoul');

  // 초깃값 설정 및 초기화 flag설정
  useEffect(() => {
    if (initialProfile) {
      setServices(initialProfile.services);
      setLivingArea(initialProfile.livingArea);
    }
    setIsInitializing(false); // 초기화 완료
  }, [initialProfile]);

  const handleRegionSelect = (region: keyof AreaType) => {
    setLivingArea(region);
  };

  const isEnabledButton =
    formState.isValid && services.length > 0 && livingArea !== null && !isProcessing;

  const { mutate: submitProfile } = useCreateProfileMutation(
    initialProfile ? profilesApi.updateCustomerProfile : profilesApi.createCustomerProfile,
  );

  const handleClickSubmit = (inputData: FormProfileInput) => {
    console.log('[SUBMIT] profileImage 값:', inputData.profileImage);
    if (!livingArea) return; // livingArea 없으면 안전하게 빠지기
    setIsProcessing(true);
    const data: CreateCustomerProfileDto = {
      profileImage: inputData.profileImage,
      services,
      livingArea,
    };
    submitProfile(data);
  };

  const handleClickCancel = () => {
    router.back();
  };

  // useState의 초기 설정값이 useEffect에 의해 바뀌는 그 순간의 깜박임을 막기 위함
  if (isInitializing) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(handleClickSubmit)}>
      <GroupProfileImageInput control={control} defaultImageUrl={initialProfile?.profileImage} />
      <GroupServiceTypeSelect
        services={services}
        setServices={setServices}
        title1="이용 서비스"
        title2="* 중복 선택 및 수정 가능, 견적 요청 시 선택 가능"
      />
      <DividerHor />
      <GroupRegionSelect selectedRegion={livingArea} onRegionSelect={handleRegionSelect} />
      <ButtonSolid disabled={!isEnabledButton}>
        {isProcessing ? <Loader /> : initialProfile ? '수정하기' : '시작하기'}
      </ButtonSolid>
      {initialProfile && (
        <div className="mt-2 lg:mt-4">
          <ButtonOutlined type="button" onClick={handleClickCancel}>
            취소
          </ButtonOutlined>
        </div>
      )}
    </form>
  );
}

export default FormProfileCustomer;
