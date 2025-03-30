import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';

interface RegionSelectorProps {
  onRegionSelect: (region: string) => void;
  selectedRegion?: string;
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
}: RegionSelectorProps) {
  return (
    <div className='flex flex-col gap-2'>
      {REGIONS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex flex-wrap gap-2'>
          {row.map((region) => (
            <ChipBubbleTypeBox
              key={region}
              text={region}
              isSelected={region === selectedRegion}
              onClick={() => onRegionSelect(region)}
              isSelectable={true}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default RegionSelector;
