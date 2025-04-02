import ChipAddressTitle from "../atoms/ChipAddressTitle";

type Props = {
  title: string;
  content: string;
};

export default function AddressContentBox(props: Props) {
  return (
    <div className="flex flex-row items-start  gap-x-2">
      <ChipAddressTitle>{props.title}</ChipAddressTitle>
      <p className="flex-1">{props.content}</p>
    </div>
  );
}
