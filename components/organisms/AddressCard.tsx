import AddressContentBox from "../molecules/AddressContentBox";

interface Props {
  houseNumber: number;
  roadName: string;
  streetName: string;
  choice?: boolean;
}

export default function AddressCard(props: Props) {
  const choiceCheck = () => {
    return props.choice ? "bg-[#4DA9FF]" : "bg-[#FFFFFF]";
  };

  return (
    <div
      className={`cursor-pointer p-[16px] pb-[24px] rounded-2xl border-[1px] border-[#F2F2F2] flex flex-col items-start gap-y-4 ${choiceCheck()}`}
      onClick={() => {}}
    >
      <h3 className="font-bold text-lg">{props.houseNumber}</h3>
      <div>
        <AddressContentBox title={"도로명"} content={props.roadName} />
        <AddressContentBox title={"지번"} content={props.streetName} />
      </div>
    </div>
  );
}
