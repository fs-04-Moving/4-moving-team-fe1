'use client';

import { useState } from 'react';
import DropdownButton from '../atoms/DropdownButton';
import DropdownList from '../atoms/DropdownList';

interface Props<T> {
  defaultValue: T;
  options: T[];
  onSelect?: () => void;
}

export type DropdownButtonStatus = 'default' | 'active' | 'done';

/**
 * dropdown 컴포넌트입니다.
 * @param
 * - defaultValue: 초기 선택값(제네릭 타입)
 * - options: 제네릭 타입의 배열
 * - onSelect?: dropdown list의 특정값을 선택했을 때 실행하는 함수
 * @returns
 */
function Dropdown<T extends string>({ defaultValue, options }: Props<T>) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownButtonStatus: DropdownButtonStatus = isShowDropdown
    ? 'active'
    : 'done';

  /**
   * 포커스 아웃시 onBlur가 호출되었을 때 blur이벤트로 드롭다운 메뉴가 클릭되지 않는 문제 발생
   * - setTimeout으로 메뉴가 닫히는 것을 딜레이함으로써 해결
   * - 너무 짧게 설정하면 작동하지 않음. 100이 적당
   */
  const handleBlur = () => {
    setTimeout(() => {
      setIsShowDropdown(false);
    }, 100);
  };

  const handleClickButton = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  const handleSelectOption = (option: T) => {
    setSelectedOption(option);
    setIsShowDropdown(false);
  };

  return (
    <div className="w-full relative" onBlur={handleBlur}>
      <DropdownButton
        status={dropdownButtonStatus}
        selectedValue={selectedOption}
        onClick={handleClickButton}
      />
      {/* {isShowDropdown && (
        <DropdownMenu menuOptions={options} onSelect={handleSelectOption} />
      )} */}
      <DropdownList
        isShow={isShowDropdown}
        listOptions={options}
        onSelect={handleSelectOption}
      />
    </div>
  );
}

export default Dropdown;
