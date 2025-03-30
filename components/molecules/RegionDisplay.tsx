import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';

interface RegionDisplayProps {
  region: string;
}

function RegionDisplay({ region }: RegionDisplayProps) {
  return (
    <div className='inline-block'>
      <ChipBubbleTypeBox text={region} isSelectable={false} />
    </div>
  );
}

export default RegionDisplay;
