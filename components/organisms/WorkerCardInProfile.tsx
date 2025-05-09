import icWriting from '@/assets/images/ic-writing.svg';
import { Area } from '@/types/entities/user.entity';
import { AREA_DATA, ServiceType } from '@/types/move.type';
import Image from 'next/image';
import ButtonOutlined from '../atoms/ButtonOutlined';
import ButtonSolid from '../atoms/ButtonSolid';
import ChipText from '../atoms/ChipText';
import UserAvartar from '../atoms/UserAvartar';
import RatingSummary from '../molecules/RatingSummary';

type Props = {
  profileImage: string;
  nickname: string;
  experience: string;
  confirmedEstimatesCount: number;
  services: ServiceType[];
  onConfirm?: () => void;
  onViewDetail?: () => void;
  summary: string;
  serviceAreas: Area[];
  reviewsAverage: number;
  reviewsCount: number;
};

/**
 * WorkerCardInProfile 컴포넌트
 *
 * 마이페이지에서 기사 본인의 프로필 정보를 보여주는 카드 컴포넌트입니다.
 * 기사 프로필 이미지, 닉네임, 한 줄 소개, 제공 서비스 및 활동 지역 정보와 리뷰, 경력, 확정 건수 요약을 제공합니다.
 * '내 프로필 수정' 및 '기본 정보 수정' 버튼을 통해 사용자 액션을 트리거할 수 있으며,
 * 버튼 위치는 반응형 레이아웃에 따라 변경됩니다.
 *
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {number} experience - 기사 경력 (년 단위)
 * @param {number} confirmedEstimatesCount - 확정된 이사 견적 수
 * @param {string} summary - 기사 한 줄 소개 텍스트
 * @param {AreaType} serviceAreas - 기사 활동 지역 (예: ['seoul', 'incheon'])
 * @param {ServiceType[]} services - 기사 제공 서비스 유형 배열 (예: ['smallMove', 'homeMove'])
 * @param {() => void} [onConfirm] - '내 프로필 수정' 버튼 클릭 시 실행될 콜백
 * @param {() => void} [onViewDetail] - '기본 정보 수정' 버튼 클릭 시 실행될 콜백
 * @param {number} reviewsAverage - 리뷰 평균
 * @param {number} reviewsCount - 리뷰 개수
 *
 * @example
 * <WorkerCardInProfile
 *   profileImage="/images/sample.jpg"
 *   nickname="김이사"
 *   experience={8}
 *   confirmedEstimatesCount={120}
 *   summary="빠르고 꼼꼼한 기사입니다."
 *   serviceAreas={['seoul', 'incheon']}
 *   services={['smallMove', 'homeMove']}
 *   onConfirm={() => console.log('프로필 수정')}
 *   onViewDetail={() => console.log('기본 정보 수정')}
 *   reviewsAverage={4.7}
 *   reviewsCount={108}
 * />
 */
function WorkerCardInProfile({
  profileImage,
  nickname,
  experience,
  confirmedEstimatesCount,
  summary,
  serviceAreas,
  services,
  reviewsAverage,
  reviewsCount,
  onConfirm,
  onViewDetail,
}: Props) {
  const formattedServcies: string[] = services.map((service) => {
    switch (service) {
      case 'smallMove':
        return '소형이사';
      case 'homeMove':
        return '가정이사';
      case 'officeMove':
        return '사무실이사';
    }
  });

  const formattedServiceAreas: string[] = serviceAreas.map((aera) => AREA_DATA[aera]);

  return (
    <div className="flex flex-col gap-2.5">
      {/* s,m 스크린 */}
      <div className="flex flex-col lg:justify-between  gap-4 bg-BackGround-200 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[222px] md:w-[600px] md:h-[186px] lg:w-[1400px] lg:h-[272px] px-3.5 py-4 lg:p-6">
        <div className="flex gap-4 lg:justify-between">
          <span className="lg:hidden">
            <UserAvartar imgUrl={profileImage} />
          </span>
          <div className="flex flex-col gap-1 lg:gap-2 text-[14px]">
            <div className="lg:text-2xl">{nickname}</div>
            <div className="text-GrayScale-400 font-normal lg:text-xl">{summary}</div>
          </div>
          {/* 버튼 in lg */}
          <span className="hidden lg:inline-flex gap-2 w-[576px]">
            {/* todo: 글자 세로 가운데 정렬하기 */}
            <ButtonOutlined onClick={onViewDetail} intent="done">
              기본 정보 수정
              <Image className="inline" src={icWriting} width={24} height={24} alt="pencil icon" />
            </ButtonOutlined>
            <ButtonSolid onClick={onConfirm}>
              내 프로필 수정
              <Image className="inline" src={icWriting} width={24} height={24} alt="pencil icon" />
            </ButtonSolid>
          </span>
        </div>
        {/* 박스 */}
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between lg:justify-normal gap-3 bg-GrayScale-50 border-Line-100 border-[1px] rounded-md p-2.5 lg:px-[18px] lg:py-[24px] h-[120px] md:h-[84px] lg:h-[128px] lg:gap-6`}
        >
          <span className="hidden lg:inline-block">
            <UserAvartar imgUrl={profileImage} sizeInLarge={80} />
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5 md:justify-normal text-[14px] lg:text-[16px] md:gap-2.5 lg:gap-4">
              <RatingSummary reviewsAverage={reviewsAverage | 0} reviewsCount={reviewsCount} />
              <span className="text-GrayScale-100">|</span>
              <span>
                <span className="text-GrayScale-300">경력</span>
                {` ${experience}년`}
              </span>
              <span className="text-GrayScale-100">|</span>
              <span>
                {`${confirmedEstimatesCount}건 `}
                <span className="text-GrayScale-300">확정</span>
              </span>
            </div>
            <div className="flex flex-col md:flex-row lg:items-center gap-2 lg:gap-3 text-[14px] lg:text-lg">
              <span className="flex items-center gap-2 lg:gap-3">
                <ChipText>제공 서비스</ChipText>
                <span>{Object.values(formattedServcies).join(', ')}</span>
              </span>
              <span className="hidden md:inline-block text-GrayScale-200">|</span>
              <span className="flex items-center gap-2 lg:gap-3">
                <ChipText>지역</ChipText>
                <span>{Object.values(formattedServiceAreas).join(', ')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 버튼 in sm, md */}
      <div className="lg:hidden flex flex-col items-center md:flex-row gap-2 w-[327px] md:w-[600px]">
        {/* todo: 글자 세로 가운데 정렬하기 */}
        <ButtonSolid onClick={onConfirm}>
          내 프로필 수정
          <Image className="inline" src={icWriting} width={24} height={24} alt="pencil icon" />
        </ButtonSolid>
        <ButtonOutlined onClick={onViewDetail} intent="done">
          기본 정보 수정
          <Image className="inline" src={icWriting} width={24} height={24} alt="pencil icon" />
        </ButtonOutlined>
      </div>
      {/* lg 스크린 */}
    </div>
  );
}

export default WorkerCardInProfile;
