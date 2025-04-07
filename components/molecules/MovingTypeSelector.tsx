/**
 *
 * @description
 * 이사 유형을 선택하는 컴포넌트
 *
 * @example
 * const [selectedTypes, setSelectedTypes] = useState<ServiceType['type'][]>([]);
 *
 * <MovingTypeSelector
 *   onTypeSelect={(types) => setSelectedTypes(types)}
 *   selectedTypes={selectedTypes}
 * />
 *
 * @param {Function} props.onTypeSelect - 유형 선택 시 호출되는 콜백 함수
 * @param {ServiceType['type'][]} props.selectedTypes - 선택된 유형들의 배열
 */

import ChipBubbleTypeBox from '@/components/atoms/ChipBubbleTypeBox';
import { ServiceType } from '@/types/move.type';

// 이사 유형 상수
const MOVING_TYPES: Record<ServiceType['type'], string> = {
  smallMove: '소형 이사',
  homeMove: '가정 이사',
  officeMove: '사무실 이사',
};

// 이사 유형 키 배열
const MOVING_TYPE_KEYS = Object.keys(MOVING_TYPES) as ServiceType['type'][];

interface MovingTypeSelectorProps {
  onTypeSelect: (types: ServiceType['type'][]) => void;
  selectedTypes: ServiceType['type'][];
}

function MovingTypeSelector({
  onTypeSelect,
  selectedTypes,
}: MovingTypeSelectorProps) {
  // 선택 처리
  const handleTypeSelect = (type: ServiceType['type']) => {
    const isSelected = selectedTypes.includes(type);
    const newSelection = isSelected
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypeSelect(newSelection);
  };

  // 선택 상태 확인
  const isTypeSelected = (type: ServiceType['type']) => {
    return selectedTypes.includes(type);
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {MOVING_TYPE_KEYS.map((type) => (
        <ChipBubbleTypeBox
          key={type}
          text={MOVING_TYPES[type]}
          isSelected={isTypeSelected(type)}
          onClick={() => handleTypeSelect(type)}
          canClick={true}
        />
      ))}
    </div>
  );
}

export default MovingTypeSelector;
