interface Props {
  BoxClassName: string;
  onClickTotalCheck: () => void;
  isAllSelected: boolean;
}

function AllChoiceCheckBoxInWorkerPage(props: Props) {
  return (
    <div
      className={`${props.BoxClassName} items-center text-[18px] text-[#ABABAB]  cursor-pointer`}
      onClick={props.onClickTotalCheck}
    >
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-500 border-[#E6E6E6] border-[1px] rounded focus:ring-[#1B92FF]"
        checked={props.isAllSelected}
        onChange={props.onClickTotalCheck}
      />
      <p>전체선택</p>
    </div>
  );
}

export default AllChoiceCheckBoxInWorkerPage;
