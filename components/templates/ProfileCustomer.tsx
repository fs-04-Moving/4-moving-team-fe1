'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { CreateCustomerProfileDto } from '@/types/dtos/profile.dto';
import {
  ServiceTypeEng,
  ServiceTypeKor,
  ServiceTypeObject,
} from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { AreaType } from '@/types/move.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import ChipBubbleTypeBoxGen from '../atoms/ChipBubbleTypeBoxGen';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import Loader from '../atoms/Loader';
import InputFile from '../molecules/InputFile';
import RegionSelector from '../molecules/RegionSelector';

interface FormProfileInput {
  profileImage: File | null;
}

function ProfileCustomer() {
  const { control, handleSubmit, formState } = useForm<FormProfileInput>({
    defaultValues: { profileImage: null },
  });

  const queryClient = useQueryClient();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleClickStart = (inputData: FormProfileInput) => {
    setIsProcessing(true);
    const data: CreateCustomerProfileDto = {
      profileImage: inputData.profileImage,
      services,
      livingArea,
    };
    createCustomerProfile(data);
  };

  const { mutate: createCustomerProfile } = useMutation({
    mutationFn: (data: CreateCustomerProfileDto) =>
      profilesApi.createCustomerProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setIsProcessing(false);
    },
  });

  const serviceTypeKors: ServiceTypeKor[] = Object.values(ServiceTypeObject);

  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [livingArea, setLivingArea] = useState<Area>('seoul');

  const handleClickServiceChip = (serviceKor: ServiceTypeKor) => {
    if (!serviceKor) return;
    // 한글로 선택된 값을 영문으로 변경
    const serviceEng = Object.keys(ServiceTypeObject).find(
      (key) =>
        ServiceTypeObject[key as keyof typeof ServiceTypeObject] === serviceKor
    ) as ServiceTypeEng;

    const index = services.indexOf(serviceEng);
    // 이미 선택된 값일 경우 삭제, 아닐 경우 추가
    if (index === -1) {
      setServices((prev) => [...prev, serviceEng]);
    } else {
      // 선택된 값이 1개일 경우에는 삭제하지 않음
      if (services.length === 1) return;
      const newServices = services.filter((_, i) => i !== index);
      setServices(newServices);
    }
  };

  const handleRegionSelect = (region: keyof AreaType) => {
    setLivingArea(region);
  };

  const isEnabledButton =
    formState.isValid && services.length !== 0 && !!livingArea && !isProcessing;

  return (
    <div className="flex flex-col w-[327px] lg:w-[640px]">
      <Label>프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-16">
        <div className="mb-10 lg:mb-16">
          <form onSubmit={handleSubmit(handleClickStart)}>
            <div className="mb-5 lg:mb-8">
              <div className="mb-4 lg:mb-6">
                <Label intent="sm">프로필 이미지</Label>
              </div>
              <InputFile
                name="profileImage"
                control={control}
                id="profileImage"
              />
            </div>
            <DividerHor />
            <div className="mb-2 mt-5 lg:mt-8">
              <Label intent="sm" required={true}>
                이용 서비스
              </Label>
            </div>
            <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
              * 중복 선택 및 수정 가능, 견적 요청 시 선택 가능
            </p>
            <div className="flex gap-[6px] lg:gap-3 mb-5 lg:mb-8">
              {serviceTypeKors.map((serviceType) => {
                const serviceEng = Object.keys(ServiceTypeObject).find(
                  (key) =>
                    ServiceTypeObject[key as keyof typeof ServiceTypeObject] ===
                    serviceType
                ) as ServiceTypeEng;
                const isSelected = services.includes(serviceEng);
                return (
                  <ChipBubbleTypeBoxGen
                    key={serviceType}
                    text={serviceType}
                    onClick={() => handleClickServiceChip(serviceType)}
                    canClick={true}
                    isSelected={isSelected}
                  />
                );
              })}
            </div>
            <DividerHor />
            <div className="mb-2 mt-5 lg:mt-8">
              <Label intent="sm" required={true}>
                내가 사는 지역
              </Label>
            </div>
            <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
              * 견적 요청 시 다시 설정 가능
            </p>
            <div className="mb-8 lg:mb-14">
              <RegionSelector
                selectedRegion={livingArea}
                onRegionSelect={(region) =>
                  handleRegionSelect(region as keyof AreaType)
                }
              />
            </div>
            <ButtonSolid disabled={!isEnabledButton}>
              {isProcessing ? <Loader /> : '시작하기'}
            </ButtonSolid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileCustomer;
