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
          className={`flex justify-between items-center  w-[328px] h-[68px] p-4 border-b-[1px] border-[#F2F2F2] cursor-pointer`}
        >
          <span className="text-[18px] font-[500]">
            {item.name} ({item.count})
          </span>
          <input
            type="checkbox"
            className="w-5 h-5  border-[1px] border-[#E6E6E6] rounded focus:ring-[#1B92FF]"
            checked={selected[item.id] || false}
            onChange={() => toggleCheckbox(item.id)}
          />
        </label>
      ))}
    </div>
  );
}

export default IndividualTypeCheckBox;
