interface MovingTypes {
  id: number;
  name: string;
  count: number;
}

interface FilterLists {
  id: number;
  name: string;
  count: number;
}

interface Props {
  items: (MovingTypes | FilterLists)[];
  selected: Record<number, boolean>;
  toggleCheckbox: (id: number) => void;
}

function IndividualTypeCheckBox({ items, selected, toggleCheckbox }: Props) {
  return (
    <>
      {items.map((item) => (
        <label
          key={item.id}
          className={`flex justify-between items-center p-4 border-b-[2px] border-[#F2F2F2] last:border-b-0 cursor-pointer`}
        >
          <span className="text-[14px] font-bold">
            {item.name} ({item.count})
          </span>
          <input
            type="checkbox"
            className="w-6 h-6 text-blue-500 border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
            checked={selected[item.id] || false}
            onChange={() => toggleCheckbox(item.id)}
          />
        </label>
      ))}
    </>
  );
}

export default IndividualTypeCheckBox;
