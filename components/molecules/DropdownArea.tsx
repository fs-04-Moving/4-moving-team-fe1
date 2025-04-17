/**
 * DropdownArea 컴포넌트
 *
 * @description
 * 지역 선택을 위한 드롭다운 컴포넌트입니다.
 * - 지역명과 지역 코드를 함께 제공
 *
 * @example
 * import { useState } from 'react';
 * import DropdownArea from '@/components/molecules/DropdownArea';
 *
 * const [selectedArea, setSelectedArea] = useState('전체');
 * const [areaCode, setAreaCode] = useState('all');
 *
 * const handleAreaSelect = (area: string, code?: string) => {
 *   setSelectedArea(area);
 *   if (code) setAreaCode(code);
 * };
 *
 * <DropdownArea
 *   includeAll={true}
 *   defaultValue='전체'
 *   onSelect={handleAreaSelect}
 * />
 *
 * @param {boolean} props.includeAll - "전체" 옵션 포함 여부 (기본값: true)
 * @param {string} props.defaultValue - 초기 선택값 (기본값: "전체" 또는 첫 번째 지역)
 * @param {Function} props.onSelect - 지역 선택 시 호출되는 콜백 함수, 선택된 지역명과 지역 코드를 인자로 받음
 */

'use client';

import { AREA_CONSTANTS, AREA_KEYS } from '@/constants/areaConstants';
import { useState } from 'react';
import DropdownButtonArea from '../atoms/DropdownButtonArea';
import DropdownListDoubleRow from '../atoms/DropdownListDoubleRow';

interface Props {
  includeAll?: boolean; // "전체" 옵션 포함 여부
  defaultValue?: string; // 기본 선택 값
  onSelect?: (selectedArea: string, areaCode?: string) => void; // 선택된 지역명과 코드를 전달하는 콜백
}

export type DropdownButtonStatus = 'default' | 'active' | 'done';

function DropdownArea({ includeAll = true, defaultValue, onSelect }: Props) {
  // 지역 옵션 준비
  const ALL_OPTION = '전체';
  const areaValues = Object.values(AREA_CONSTANTS);
  const areaOptions = includeAll ? [ALL_OPTION, ...areaValues] : areaValues;

  // 기본값 설정
  const initialValue =
    defaultValue || (includeAll ? ALL_OPTION : areaValues[0]);

  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownButtonStatus: DropdownButtonStatus = isShowDropdown
    ? 'active'
    : 'done';

  // 지역명으로 지역 코드 찾기
  const getAreaCodeByName = (areaName: string): string => {
    if (areaName === ALL_OPTION) return 'all';
    const areaKey = AREA_KEYS.find((key) => AREA_CONSTANTS[key] === areaName);
    return areaKey || 'all';
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsShowDropdown(false);
    }, 100);
  };

  const handleClickButton = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsShowDropdown(false);

    if (onSelect) {
      const areaCode = getAreaCodeByName(option);
      onSelect(option, areaCode);
    }
  };

  return (
    <div className="w-full relative" onBlur={handleBlur}>
      <DropdownButtonArea
        status={dropdownButtonStatus}
        selectedValue={selectedOption}
        onClick={handleClickButton}
      />
      <DropdownListDoubleRow
        isShow={isShowDropdown}
        listOptions={areaOptions || []}
        onSelect={handleSelectOption}
      />
    </div>
  );
}

export default DropdownArea;
