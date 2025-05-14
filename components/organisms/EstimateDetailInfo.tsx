import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ServiceType } from '@/types/move.type';

type Props = {
  requestDate: Date;
  serviceType: ServiceType;
  movingDate: Date;
  departure: string;
  destination: string;
};

/**
 * EstimateDetailInfo 컴포넌트
 *
 * 견적 요청의 상세 정보를 보여주는 컴포넌트입니다.
 * 견적 요청일, 서비스 유형, 이용일, 출발지, 도착지 정보를 표시합니다.
 *
 * @param {Date} requestDate - 견적 요청 날짜
 * @param {ServiceType} serviceType - 이사 서비스 유형
 * @param {Date} movingDate - 이사 예정일
 * @param {string} departure - 출발지 주소
 * @param {string} destination - 도착지 주소
 *
 * @example
 * <EstimateDetailInfo
 *   requestDate={new Date('2024-08-26')}
 *   serviceType="officeMove"
 *   movingDate={new Date('2024-08-26T10:00:00')}
 *   departure="서울 중구 삼일대로 343"
 *   destination="서울 강남구 선릉로 428"
 * />
 */
function EstimateDetailInfo({
  requestDate,
  serviceType,
  movingDate,
  departure,
  destination,
}: Props) {
  // 견적 요청일 포맷팅 (YYYY.MM.DD)
  const formattedRequestDate = format(requestDate, 'yy.MM.dd', { locale: ko });

  // 이사 날짜 및 시간 포맷팅 (YYYY. MM. DD(요일) 오전/오후 HH:MM)
  const formattedMovingDate = format(movingDate, 'yyyy. MM. dd(eee) a h:mm', {
    locale: ko,
  });

  // 서비스 타입 한글 변환
  const getServiceTypeKorean = (type: ServiceType) => {
    switch (type) {
      case 'smallMove':
        return '소형이사';
      case 'homeMove':
        return '가정이사';
      case 'officeMove':
        return '사무실이사';
      default:
        return '';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-[#1F1F1F] text-[16px] lg:text-[24px] font-[600]">견적 정보</h2>
      <div className="w-full h-[192px] md:h-[208px] lg:h-[258px] bg-BackGround-200 rounded-2xl p-4 md:p-0">
        <div className="h-full flex flex-col gap-2.5 md:px-6 md:py-6 lg:px-10 lg:py-8">
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <div className="flex items-center">
              <span className="w-[100px] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px] font-[400] text-gray-300">
                견적 요청일
              </span>
              <span className="font-[400] text-[#1F1F1F] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                {formattedRequestDate}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-[100px] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px] font-[400] text-gray-300">
                서비스
              </span>
              <span className="font-[400] text-[#1F1F1F] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                {getServiceTypeKorean(serviceType)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-[100px] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px] font-[400] text-gray-300">
                이용일
              </span>
              <span className="font-[400] text-[#1F1F1F] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                {formattedMovingDate}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-[100px] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px] font-[400] text-gray-300">
                출발지
              </span>
              <span className="font-[400] text-[#1F1F1F] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                {departure}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-[100px] text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px] font-[400] text-gray-300">
                도착지
              </span>
              <span className="text-[14px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                {destination}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstimateDetailInfo;
