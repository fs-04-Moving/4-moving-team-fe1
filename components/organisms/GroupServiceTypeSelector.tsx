'use client';

import {
  ServiceTypeEng,
  ServiceTypeKor,
  serviceTypeObject,
} from '@/types/entities/estimate.entity';
import ChipBubbleTypeBox from '../atoms/ChipBubbleTypeBox';
import DividerHor from '../atoms/DividerHor';
import Label from '../atoms/Label';

export interface GroupServiceTypeSelectProps {
  services: ServiceTypeEng[];
  setServices: (v: ServiceTypeEng[]) => void;
  title1: string;
  title2: string;
}

function GroupServiceTypeSelect({
  services,
  setServices,
  title1,
  title2,
}: GroupServiceTypeSelectProps) {
  const serviceTypeKors: ServiceTypeKor[] = Object.values(serviceTypeObject);

  const handleClickServiceChip = (serviceKor: ServiceTypeKor) => {
    const serviceEng = Object.keys(serviceTypeObject).find(
      (key) =>
        serviceTypeObject[key as keyof typeof serviceTypeObject] === serviceKor
    ) as ServiceTypeEng;

    const index = services.indexOf(serviceEng);
    if (index === -1) {
      setServices([...services, serviceEng]);
    } else {
      if (services.length === 1) return;
      const newServices = services.filter((_, i) => i !== index);
      setServices(newServices);
    }
  };
  console.log(services);
  return (
    <>
      <DividerHor />
      <div className="mb-2 mt-5 lg:mt-8">
        <Label intent="sm" required={true}>
          {title1}
        </Label>
      </div>
      <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
        {title2}
      </p>
      <div className="flex gap-[6px] lg:gap-3 mb-5 lg:mb-8">
        {serviceTypeKors.map((serviceType) => {
          const serviceEng = Object.keys(serviceTypeObject).find(
            (key) =>
              serviceTypeObject[key as keyof typeof serviceTypeObject] ===
              serviceType
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
    </>
  );
}

export default GroupServiceTypeSelect;
