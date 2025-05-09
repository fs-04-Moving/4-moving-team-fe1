import { EstimateStatus, ServiceType } from "@/types/move.type";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ButtonOutlined from "../atoms/ButtonOutlined";
import ButtonSolid from "../atoms/ButtonSolid";
import ChipEstimateRequestStatus from "../atoms/ChipEstimateRequestStatus";
import ChipEstimateStatus from "../atoms/ChipEstimateStatus";
import ChipMovingType from "../atoms/ChipMovingType";
import ChipText from "../atoms/ChipText";
import WorkerInfoBoxA from "./WorkerInfoBoxA";

type Props = {
  profileImage: string;
  nickname: string;
  experience: number;
  confirmedEstimatesCount: number;
  isFavorite: boolean;
  favoritesCount: number;
  services: ServiceType[];
  isDirectEstimate: boolean;
  price: number;
  status: EstimateStatus;
  movingDate: Date;
  departure: string;
  destination: string;
  reviewsAverage: number;
  reviewsCount: number;
  onConfirm?: () => void;
  onViewDetail?: () => void;
};

/**
 * WorkerCardInWating 컴포넌트
 *
 * 견적 대기 상태의 기사 카드 UI로, 기사 정보와 견적 요청 상태를 한눈에 보여줍니다.
 * 상단에는 서비스 관련 Chip들이 표시되고, 중간에는 기사 프로필 및 기본 정보(닉네임, 경력, 확정 이사 건수, 찜 여부 등)가,
 * 그 아래에는 견적 정보(이사일, 출발지, 도착지, 견적 금액)가 표시됩니다.
 * 마지막으로, '견적 확정하기'와 '상세 보기' 버튼을 통해 상위 컴포넌트의 액션을 트리거할 수 있습니다.
 * 반응형 디자인을 적용하여, 화면 크기에 따라 작성일의 위치 및 정보 배치가 다르게 조정됩니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 (년 단위)
 * @param {number} confirmedEstimatesCount - 기사 견적 확정 건수
 * @param {boolean} isFavorite - 사용자가 해당 기사를 찜했는지 여부
 * @param {number} favoritesCount - 이 기사를 찜한 총 사용자 수
 * @param {ServiceType[]} services - 기사가 제공하는 이사 서비스 유형 배열 (예: ['smallMove', 'homeMove'])
 * @param {boolean} isDirectEstimate - 지정 견적 여부
 * @param {number} price - 견적 금액 (단위: 원)
 * @param {EstimateStatus} status - 견적 요청 상태
 * @param {Date} movingDate - 이사일 (날짜 객체)
 * @param {string} departure - 출발지
 * @param {string} destination - 도착지
 * @param {number} reviewsAverage - 리뷰 평균
 * @param {number} reviewsCount - 리뷰 개수
 * @param {() => void} [onConfirm] - '견적 확정하기' 버튼 클릭 시 호출되는 콜백 함수
 * @param {() => void} [onViewDetail] - '상세 보기' 버튼 클릭 시 호출되는 콜백 함수
 *
 * @example
 * <WorkerCardInWating
 *   profileImage="/images/driver1.png"
 *   nickname="김이사"
 *   experience={8}
 *   confirmedEstimatesCount={342}
 *   isFavorite={true}
 *   favoritesCount={128}
 *   services={['smallMove', 'homeMove']}
 *   isDirectEstimate={true}
 *   price={210000}
 *   status="general" // 실제 Enum 값으로 대체 필요
 *   movingDate={new Date('2024-07-01')}
 *   departure="서울시 중구"
 *   destination="경기도 수원시"
 *   onConfirm={() => console.log('견적 확정하기 클릭')}
 *   onViewDetail={() => console.log('상세 보기 클릭')}
 *   reviewsAverage={4.7}
 *   reviewsCount={108}
 * />
 */
function WorkerCardInWating({
  profileImage,
  nickname,
  experience,
  confirmedEstimatesCount,
  isFavorite,
  favoritesCount,
  services,
  isDirectEstimate,
  price,
  status,
  movingDate,
  departure,
  destination,
  reviewsAverage,
  reviewsCount,
  onConfirm,
  onViewDetail,
}: Props) {
  const formatDateFnsKorean = (date: Date): string => {
    const formatted = format(date, "yyyy. MM. dd", { locale: ko });
    const day = format(date, "eee", { locale: ko }); // '월', '화' 등
    return `${formatted}(${day})`;
  };

  const formattedDate = formatDateFnsKorean(movingDate);

  const formattedDeparture = departure.split(" ").slice(0, 2).join(" ");
  const formattedDestination = destination.split(" ").slice(0, 2).join(" ");

  return (
    <div className="flex flex-col justify-between gap-2 shadow-xs bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[398px] md:w-[600px] md:h-[362px] lg:w-[688px] lg:h-[410px] px-3.5 py-4">
      <div className="flex gap-2.5">
        <ChipEstimateRequestStatus type={status} />
        {services.map((service, index) => (
          <ChipMovingType key={index} type={service} isShort={true} />
        ))}
        {isDirectEstimate ? (
          <ChipEstimateStatus type="assigned" isShort={true} />
        ) : (
          ""
        )}
      </div>
      {/* 기사 소개 박스 */}
      <WorkerInfoBoxA
        profileImage={profileImage}
        nickname={nickname}
        experience={experience}
        confirmedEstimatesCount={confirmedEstimatesCount}
        isFavorite={isFavorite}
        favoritesCount={favoritesCount}
        reviewsAverage={reviewsAverage}
        reviewsCount={reviewsCount}
      />
      {/* 견적 정보 */}
      <div className="flex flex-col lg:flex-row gap-3.5 lg:gap-4 text-[14px] lg:text-lg">
        <div className="flex items-center gap-2 lg:gap-3">
          <ChipText>이사일</ChipText>
          <span>{formattedDate}</span>
        </div>
        <span className="hidden lg:inline-block text-GrayScale-200">|</span>
        <div className="flex lg:items-center gap-2 lg:gap-3">
          <ChipText>출발</ChipText>
          <span>{formattedDeparture}</span>
          <span className="text-GrayScale-200">|</span>
          <ChipText>도착</ChipText>
          <span>{formattedDestination}</span>
        </div>
      </div>
      <div className="flex justify-end items-end gap-2 lg:gap-4">
        <span className="text-[14px] lg:text-lg leading-none">견적 금액</span>
        <span className="text-lg lg:text-2xl font-bold leading-none relative top-[1.5px]">{`${price.toLocaleString()}원`}</span>
      </div>
      {/* 버튼 */}
      <div className="flex flex-col md:flex-row gap-2">
        <ButtonSolid onClick={onConfirm}>견적 확정하기</ButtonSolid>
        <ButtonOutlined onClick={onViewDetail}>상세 보기</ButtonOutlined>
      </div>
    </div>
  );
}

export default WorkerCardInWating;
