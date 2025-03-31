/**
 * RegionSelector 컴포넌트
 *
 * @description
 * 프로필 등록/수정 페이지 지역 선택 컴포넌트
 *
 * @example
 *  일반 사용자용 (단일 선택)
 * const [selectedRegion, setSelectedRegion] = useState<string>('서울');
 *
 * <RegionSelector
 *   onRegionSelect={(region) => setSelectedRegion(region as string)}
 *   selectedRegion={selectedRegion}
 * />
 *
 *  기사님용 (다중 선택)
 * const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
 *
 * <RegionSelector
 *   onRegionSelect={(regions) => setSelectedRegions(regions as string[])}
 *   selectedRegion={selectedRegions}
 *   multipleSelect={true}
 * />
 *
 * @param {Function} props.onRegionSelect - 지역 선택 시 호출되는 콜백 함수
 * @param {string|string[]} props.selectedRegion - 선택된 지역(들)
 * @param {boolean} props.multipleSelect - 다중 선택 모드 활성화 여부 (기본값: false)
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';

interface RegionSelectorProps {
  onRegionSelect: (region: string | string[]) => void;
  selectedRegion?: string | string[];
  multipleSelect?: boolean; // 다중 선택 여부
}

const REGIONS = [
  ['서울', '경기', '인천', '강원', '충북'],
  ['충남', '대전', '경북', '대구', '울산'],
  ['부산', '경남', '전북', '전남', '광주'],
  ['제주', '세종'],
];

function RegionSelector({
  onRegionSelect,
  selectedRegion = '',
  multipleSelect = false,
}: RegionSelectorProps) {
  // 다중 선택 일대
  const handleMultipleSelect = (region: string) => {
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
  const handleSingleSelect = (region: string) => {
    onRegionSelect(region);
  };

  // 선택 상태 확인 함수
  const isRegionSelected = (region: string) => {
    if (multipleSelect && Array.isArray(selectedRegion)) {
      return selectedRegion.includes(region);
    }
    return region === selectedRegion;
  };

  return (
    <div className='flex flex-col gap-2'>
      {REGIONS.map((row, rowIndex) => (
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
              isSelectable={true}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default RegionSelector;
