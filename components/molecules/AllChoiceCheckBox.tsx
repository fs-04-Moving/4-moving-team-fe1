interface Props {
  BoxClassName: string;
  onClickTotalCheck: () => void;
  totalQuantity: number;
  isAllSelected: boolean;
}

function AllChoiceCheckBox(props: Props) {
  return (
    <div
      className={`${props.BoxClassName} items-center text-[16px] text-[#ABABAB] pl-[10px] pr-[16px]  py-[8px] border-b-[1px] border-[#F2F2F2] cursor-pointer`}
      onClick={props.onClickTotalCheck}
    >
      <p>{`전체선택 ${`(${props.totalQuantity || 0})`}`}</p>
      <input
        type="checkbox"
        className="w-[20px] h-[20px] text-blue-500 border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
        checked={props.isAllSelected}
        onChange={props.onClickTotalCheck}
      />
    </div>
  );
}

export default AllChoiceCheckBox;
