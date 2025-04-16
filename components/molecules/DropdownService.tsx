import { ServiceType } from '@/types/move.type';
import Dropdown from './Dropdown';

function DropdownService() {
  // ServiceType 객체 배열 생성
  const serviceTypes: ServiceType[] = [
    { type: 'smallMove' },
    { type: 'homeMove' },
    { type: 'officeMove' },
  ];

  // 서비스 타입을 문자열로 변환하여 options 배열 생성
  const options: string[] = [
    '전체',
    ...serviceTypes.map((service) => {
      // 서비스 타입에 따라 한글 이름 반환
      switch (service.type) {
        case 'smallMove':
          return '소형 이사';
        case 'homeMove':
          return '가정 이사';
        case 'officeMove':
          return '사무실 이사';
        default:
          return service.type;
      }
    }),
  ];

  return (
    <div className="w-full pb-7">
      <Dropdown options={options} defaultValue="전체" />
    </div>
  );
}
export default DropdownService;
