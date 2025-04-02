/**
 * RegionSelector 컴포넌트
 *
 * @description
 * 프로필 등록/수정 페이지 지역 선택 컴포넌트
 *
 * @example
 *  일반 사용자용 (단일 선택)
 * import { AreaType } from '@/types/move.type';
 * const [selectedRegion, setSelectedRegion] = useState<keyof AreaType>('seoul');
 *
 * <RegionSelector
 *   onRegionSelect={(region) => setSelectedRegion(region as keyof AreaType)}
 *   selectedRegion={selectedRegion}
 * />
 *
 *  기사님용 (다중 선택)
 * import { AreaType } from '@/types/move.type';
 * const [selectedRegions, setSelectedRegions] = useState<Array<keyof AreaType>>([]);
 *
 * <RegionSelector
 *   onRegionSelect={(regions) => setSelectedRegions(regions as Array<keyof AreaType>)}
 *   selectedRegion={selectedRegions}
 *   multipleSelect={true}
 * />
 *
 * @param {Function} props.onRegionSelect - 지역 선택 시 호출되는 콜백 함수
 * @param {keyof AreaType|Array<keyof AreaType>} props.selectedRegion - 선택된 지역(들)
 * @param {boolean} props.multipleSelect - 다중 선택 모드 활성화 여부 (기본값: false)
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';
import { AREA_CONSTANTS, AREA_ROWS } from '@/constants/areaConstants';
import { AreaType } from '@/types/move.type';

interface RegionSelectorProps {
  onRegionSelect: (region: keyof AreaType | Array<keyof AreaType>) => void;
  selectedRegion?: keyof AreaType | Array<keyof AreaType>;
  multipleSelect?: boolean; // 다중 선택 여부
}

function RegionSelector({
  onRegionSelect,
  selectedRegion,
  multipleSelect = false,
}: RegionSelectorProps) {
  // 다중 선택 일때
  const handleMultipleSelect = (region: keyof AreaType) => {
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
  const handleSingleSelect = (region: keyof AreaType) => {
    onRegionSelect(region);
  };

  // 선택 상태 확인 함수
  const isRegionSelected = (region: keyof AreaType) => {
    if (multipleSelect && Array.isArray(selectedRegion)) {
      return selectedRegion.includes(region);
    }
    return region === selectedRegion;
  };

  return (
    <div className='flex flex-col gap-2'>
      {AREA_ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex flex-wrap gap-2'>
          {row.map((region) => (
            <ChipBubbleTypeBox
              key={region}
              text={AREA_CONSTANTS[region]} // 한글 지역명 표시
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
