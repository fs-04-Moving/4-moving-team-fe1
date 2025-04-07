'use client';

import profilesApi from '@/api/profiles/profiles.api';
import { createWorkerProfileValiation } from '@/constants/formValidation';
import { CreateWorkerProfileDto } from '@/types/dtos/profile.dto';
import {
  ServiceTypeEng,
  ServiceTypeKor,
  ServiceTypeObject,
} from '@/types/entities/estimate.entity';
import { Area } from '@/types/entities/user.entity';
import { AreaType } from '@/types/move.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSolid from '../atoms/ButtonSolid';
import ChipBubbleTypeBox from '../atoms/ChipBubbleTypeBox';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';
import Loader from '../atoms/Loader';
import InputFile from '../molecules/InputFile';
import InputText from '../molecules/InputText';
import InputTextBox from '../molecules/InputTextBox';
import RegionSelector from '../molecules/RegionSelector';

interface FormProfileInput {
  profileImage: File | null;
  nickname: string;
  experience: string;
  summary: string;
  description: string;
}

function ProfileWorker() {
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
  const router = useRouter();

  const handleClickStart = (inputData: FormProfileInput) => {
    setIsProcessing(true);
    const { description, experience, nickname, profileImage, summary } =
      inputData;
    const data: CreateWorkerProfileDto = {
      profileImage,
      summary,
      nickname,
      description,
      experience,
      services,
      serviceAreas,
    };
    createWorkerProfile(data);
  };

  const { mutate: createWorkerProfile } = useMutation({
    mutationFn: (data: CreateWorkerProfileDto) =>
      profilesApi.createWorkerProfile(data),
    onSuccess: () => {
      router.replace('/worker');
      setIsProcessing(false);
    },
  });

  const serviceTypeKors: ServiceTypeKor[] = Object.values(ServiceTypeObject);

  const [services, setServices] = useState<ServiceTypeEng[]>(['smallMove']);
  const [serviceAreas, setServiceAreas] = useState<Area[]>(['seoul']);

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

  const handleMultipleRegionSelect = (
    regions: keyof AreaType | Array<keyof AreaType>
  ) => {
    if (Array.isArray(regions)) {
      setServiceAreas(regions);
    }
  };

  const isEnabledButton =
    formState.isValid &&
    services.length !== 0 &&
    serviceAreas.length !== 0 &&
    !isProcessing;

  return (
    <div className="flex flex-col w-[327px] lg:w-[1400px]">
      <Label>기사님 프로필 등록</Label>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
      <div className="mt-5 lg:mt-12">
        <div className="mb-10 lg:mb-12">
          <form
            onSubmit={handleSubmit(handleClickStart)}
            className="lg:flex lg:gap-18"
          >
            <div className="w-full">
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
                  별명
                </Label>
              </div>
              <div className="mb-5 lg:mb-8">
                <InputText
                  name="nickname"
                  control={control}
                  placeholder="고객들에게 보여질 이름을 입력해 주세요"
                  bgColor={true}
                />
              </div>
              <DividerHor />
              <div className="mb-2 mt-5 lg:mt-8">
                <Label intent="sm" required={true}>
                  경력(년차)
                </Label>
              </div>
              <div className="mb-5 lg:mb-8">
                <InputText
                  name="experience"
                  control={control}
                  placeholder="숫자만 입력해 주세요"
                  bgColor={true}
                />
              </div>
              <DividerHor />
              <div className="mb-2 mt-5 lg:mt-8">
                <Label intent="sm" required={true}>
                  한 줄 소개
                </Label>
              </div>
              <div className="mb-5 lg:mb-8">
                <InputText
                  name="summary"
                  control={control}
                  placeholder="10자 이상 30자 이내로 입력해 주세요"
                  bgColor={true}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="lg:hidden">
                <DividerHor />
              </div>
              <div className="mb-2 mt-5 lg:mt-0">
                <Label intent="sm" required={true}>
                  상세 설명
                </Label>
              </div>
              <div className="mb-5 lg:mb-8">
                <InputTextBox
                  name="description"
                  control={control}
                  placeholder="10자 이상 300자 이내로 입력해 주세요"
                  bgColor={true}
                />
              </div>
              <DividerHor />
              <div className="mb-2 mt-5 lg:mt-8">
                <Label intent="sm" required={true}>
                  제공 서비스
                </Label>
              </div>
              <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
                * 중복 선택 및 수정 가능, 견적 요청 시 선택 가능
              </p>
              <div className="flex gap-[6px] lg:gap-3 mb-5 lg:mb-8">
                {serviceTypeKors.map((serviceType) => {
                  const serviceEng = Object.keys(ServiceTypeObject).find(
                    (key) =>
                      ServiceTypeObject[
                        key as keyof typeof ServiceTypeObject
                      ] === serviceType
                  ) as ServiceTypeEng;
                  const isSelected = services.includes(serviceEng);
                  return (
                    <ChipBubbleTypeBox
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
                  서비스 가능 지역
                </Label>
              </div>
              <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
                * 중복 선택 및 수정 가능
              </p>
              <div className="mb-8 lg:mb-14">
                <RegionSelector
                  selectedRegion={serviceAreas}
                  onRegionSelect={handleMultipleRegionSelect}
                  multipleSelect={true}
                />
              </div>
              <ButtonSolid disabled={!isEnabledButton}>
                {isProcessing ? <Loader /> : '시작하기'}
              </ButtonSolid>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileWorker;
