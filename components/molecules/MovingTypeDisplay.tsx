/**
 *
 * @description
 * 선택된 이사 유형 보여주기
 * 상세 페이지에서 선택된 이사 유형 정보를 보여줄 때 사용합니다.
 *
 * @example
 * 다중 이사 유형 표시
 * <MovingTypeDisplay type={['smallMove', 'homeMove']} />
 *
 * @param {ServiceType['type'][]} props.types - 표시할 이사 유형 배열
 */

import ChipBubbleTypeBox from "@/components/atoms/ChipBubbleTypeBox";
import { ServiceType } from "@/types/move.type";

// 이사 유형 상수
const MOVING_TYPES: Record<ServiceType, string> = {
  smallMove: "소형 이사",
  homeMove: "가정 이사",
  officeMove: "사무실 이사",
};

interface MovingTypeDisplayProps {
  types: ServiceType[];
}

function MovingTypeDisplay({ types }: MovingTypeDisplayProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <div key={type} className="inline-block">
          <ChipBubbleTypeBox text={MOVING_TYPES[type]} canClick={false} />
        </div>
      ))}
    </div>
  );
}

export default MovingTypeDisplay;
