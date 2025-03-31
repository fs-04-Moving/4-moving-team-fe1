/**
 * RegionDisplay 컴포넌트
 *
 * @description
 * 선택된 지역을 표시하기 위한 컴포넌트입니다.
 * 주로 상세 페이지에서 선택된 지역 정보를 보여줄 때 사용합니다.
 * 단일 지역 또는 여러 지역을 표시할 수 있습니다.
 *
 * @example
 * -단일 지역 표시
 * const [selectedRegion, setSelectedRegion] = useState<string>('서울');
 * <RegionDisplay region={selectedRegion} />
 *
 * - 다중지역 표시
 * const [selectedRegions, setSelectedRegions] = useState<string[]>(['서울', '경기']);
 * <RegionDisplay region={selectedRegions} />
 *
 * @param {string|string[]} props.region - 표시할 지역명 또는 지역명 배열
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';

interface RegionDisplayProps {
  region: string | string[];
}

function RegionDisplay({ region }: RegionDisplayProps) {
  if (Array.isArray(region)) {
    return (
      <div className='flex flex-wrap gap-2'>
        {region.map((item) => (
          <div key={item} className='inline-block'>
            <ChipBubbleTypeBox text={item} isSelectable={false} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='inline-block'>
      <ChipBubbleTypeBox text={region} isSelectable={false} />
    </div>
  );
}

export default RegionDisplay;
