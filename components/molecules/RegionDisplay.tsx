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
 * const [selectedRegion, setSelectedRegion] = useState<keyof AreaType>('seoul');
 * <RegionDisplay region={selectedRegion} />
 *
 * - 다중지역 표시
 * const [selectedRegions, setSelectedRegions] = useState<Array<keyof AreaType>>(['seoul', 'gyeonggi']);
 * <RegionDisplay region={selectedRegions} />
 *
 * @param {keyof AreaType|Array<keyof AreaType>} props.region - 표시할 지역 코드 또는 지역 코드 배열
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';
import { AREA_CONSTANTS } from '@/constants/areaConstants';
import { AreaType } from '@/types/move.type';

interface RegionDisplayProps {
  region: keyof AreaType | Array<keyof AreaType>;
}

function RegionDisplay({ region }: RegionDisplayProps) {
  if (Array.isArray(region)) {
    return (
      <div className='flex flex-wrap gap-2'>
        {region.map((item) => (
          <div key={item} className='inline-block'>
            <ChipBubbleTypeBox text={AREA_CONSTANTS[item]} canClick={false} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='inline-block'>
      <ChipBubbleTypeBox text={AREA_CONSTANTS[region]} canClick={false} />
    </div>
  );
}

export default RegionDisplay;
