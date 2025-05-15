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
    <div className="flex flex-col">
      {items.map((item) => (
        <label
          key={item.id}
          className={`flex justify-between items-center px-4 py-5 border-b-[1px] border-[#F2F2F2]  cursor-pointer`}
        >
          <span className="text-[16px] font-medium">
            {item.name} ({item.count})
          </span>
          <input
            type="checkbox"
            className="w-[20px] h-[20px] text-blue-500 border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
            checked={selected[item.id] || false}
            onChange={() => toggleCheckbox(item.id)}
          />
        </label>
      ))}
    </div>
  );
}

export default IndividualTypeCheckBox;
