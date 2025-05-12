/**
 * dropdown 하단에 펼쳐지는 목록입니다. (가로 두 줄 형식)
 * @param param0
 * - listOptions: Dropdown컴포넌트로부터 전달
 * - isShow: 목록 표시 여부(기본값: false)
 * - onSelect: 목록의 값 선택 시 실행 함수(Dropdown컴포넌트로부터 전달)
 * @returns
 */
interface Props<T> {
  listOptions: T[];
  isShow: boolean;
  onSelect: (option: T) => void;
}

function DropdownListDoubleRow<T extends string>({
  listOptions: menuOptions = [],
  isShow,
  onSelect,
}: Props<T>) {
  const handleSelectOption = (option: T) => {
    return () => onSelect(option);
  };

  return (
    <div
      className={`${
        isShow ? 'scale-y-none transition origin-top' : 'scale-y-0 transition origin-top'
      } absolute top-12 lg:top-18 w-[150px] lg:w-[328px] `}
    >
      <div className="grid grid-cols-2 divide-x divide-GrayScale-100 max-h-[180px] lg:max-h-[320px] overflow-y-auto bg-white drop-shadow-sm border border-Line-200 rounded-lg lg:rounded-2xl lg:text-lg">
        {menuOptions?.map((option) => (
          <div
            key={option}
            onClick={handleSelectOption(option)}
            className="h-9 lg:h-16 flex items-center px-3.5 lg:px-6 cursor-pointer text-sm lg:text-lg"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownListDoubleRow;
