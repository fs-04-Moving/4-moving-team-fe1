'use client';

import { AreaType } from '@/types/move.type';
import Label from '../atoms/Label';
import RegionSelector from '../molecules/RegionSelector';

type GroupRegionSelectProps =
  | {
      selectedRegion: keyof AreaType;
      onRegionSelect: (region: keyof AreaType) => void;
      multipleSelect?: false;
    }
  | {
      selectedRegion: Array<keyof AreaType>;
      onRegionSelect: (region: Array<keyof AreaType>) => void;
      multipleSelect: true;
    };

const GroupRegionSelect = (props: GroupRegionSelectProps) => {
  const { selectedRegion, onRegionSelect, multipleSelect = false } = props;

  return (
    <div>
      <div className="mb-2 mt-5 lg:mt-8">
        <Label intent="sm" required>
          내가 사는 지역
        </Label>
      </div>
      <p className="text-GrayScale-400 text-xs lg:text-base mb-6 lg:mb-8">
        * 견적 요청 시 다시 설정 가능
      </p>
      <div className="mb-8 lg:mb-14">
        <RegionSelector
          selectedRegion={selectedRegion}
          onRegionSelect={
            onRegionSelect as (
              region: keyof AreaType | Array<keyof AreaType>
            ) => void
          }
          multipleSelect={multipleSelect}
        />
      </div>
    </div>
  );
};

export default GroupRegionSelect;
