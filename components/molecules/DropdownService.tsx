import Dropdown from './Dropdown';

type Props = {
  onSelect: (service: string) => void;
};

function DropdownService({ onSelect }: Props) {
  const options: string[] = ['전체', '소형 이사', '가정 이사', '사무실 이사'];

  const handleSelect = (service: string) => {
    let newService: string;
    switch (service) {
      case '소형 이사':
        newService = 'smallMove';
        break;
      case '가정 이사':
        newService = 'homeMove';
        break;
      case '사무실 이사':
        newService = 'officeMove';
        break;
      default:
        newService = 'all';
        break;
    }
    onSelect(newService);
  };

  return (
    <div className="w-full">
      <Dropdown
        options={options}
        defaultValue="서비스"
        onSelect={handleSelect}
      />
    </div>
  );
}
export default DropdownService;
