/**
 * RegionSelector 컴포넌트
 *
 * @description
 * 프로필 등록/수정 페이지 지역 선택 컴포넌트
 *
 * @example
 *  일반 사용자용 (단일 선택)
 * import { RegionEntity } from '@/types/entities/region.entity';
 * const [selectedRegion, setSelectedRegion] = useState<RegionEntity>(RegionEntity.seoul);
 *
 * <RegionSelector
 *   onRegionSelect={(region) => setSelectedRegion(region as RegionEntity)}
 *   selectedRegion={selectedRegion}
 * />
 *
 *  기사님용 (다중 선택)
 * import { RegionEntity } from '@/types/entities/region.entity';
 * const [selectedRegions, setSelectedRegions] = useState<RegionEntity[]>([]);
 *
 * <RegionSelector
 *   onRegionSelect={(regions) => setSelectedRegions(regions as RegionEntity[])}
 *   selectedRegion={selectedRegions}
 *   multipleSelect={true}
 * />
 *
 * @param {Function} props.onRegionSelect - 지역 선택 시 호출되는 콜백 함수
 * @param {RegionEntity|RegionEntity[]} props.selectedRegion - 선택된 지역(들)
 * @param {boolean} props.multipleSelect - 다중 선택 모드 활성화 여부 (기본값: false)
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';
import { RegionEntity, REGIONS } from '@/types/entities/region.entity';

interface RegionSelectorProps {
  onRegionSelect: (region: RegionEntity | RegionEntity[]) => void;
  selectedRegion?: RegionEntity | RegionEntity[];
  multipleSelect?: boolean; // 다중 선택 여부
}

// 기존에서 동적으로 구현
const REGION_ROWS = [
  REGIONS.slice(0, 5),
  REGIONS.slice(5, 10),
  REGIONS.slice(10, 15),
  REGIONS.slice(15),
];

function RegionSelector({
  onRegionSelect,
  selectedRegion,
  multipleSelect = false,
}: RegionSelectorProps) {
  // 다중 선택 일대
  const handleMultipleSelect = (region: RegionEntity) => {
    if (Array.isArray(selectedRegion)) {
      const isSelected = selectedRegion.includes(region);
      const newSelection = isSelected
        ? selectedRegion.filter((r) => r !== region)
        : [...selectedRegion, region];
      onRegionSelect(newSelection);
    } else {
      onRegionSelect([region]);
    }
  };

  // 단일 선택일때
  const handleSingleSelect = (region: RegionEntity) => {
    onRegionSelect(region);
  };

  // 선택 상태 확인 함수
  const isRegionSelected = (region: RegionEntity) => {
    if (multipleSelect && Array.isArray(selectedRegion)) {
      return selectedRegion.includes(region);
    }
    return region === selectedRegion;
  };

  return (
    <div className='flex flex-col gap-2'>
      {REGION_ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex flex-wrap gap-2'>
          {row.map((region) => (
            <ChipBubbleTypeBox
              key={region}
              text={region}
              isSelected={isRegionSelected(region)}
              onClick={() =>
                multipleSelect
                  ? handleMultipleSelect(region)
                  : handleSingleSelect(region)
              }
              canClick={true}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default RegionSelector;
