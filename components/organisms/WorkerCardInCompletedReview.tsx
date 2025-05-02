import UserAvartar from '../atoms/UserAvartar';
import ChipMovingType from '../atoms/ChipMovingType';
import { ServiceType } from '@/types/move.type';
import ButtonStarRating from '../molecules/ButtonStarRating';

type Props = {
  serviceType: ServiceType;
  profileImage: string;
  nickname: string;
  movingDate: Date;
  price: number;
  content: string;
  createdAt: Date;
  rating: number;
};

/**
 * WorkerCardInCompletedReview 컴포넌트
 *
 * 사용자가 작성한 이사 리뷰를 보여주는 카드 컴포넌트입니다.
 * 기사 정보, 이사 서비스 유형, 이사일, 견적가, 작성일, 후기 내용 및 별점 등을 표시합니다.
 * 반응형 디자인으로 화면 크기에 따라 작성일의 위치가 상단 또는 하단에 다르게 표시됩니다.
 *
 * @param {ServiceType} serviceType - 이사 서비스 유형 (예: 'smallMove', 'homeMove', 'officeMove')
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {Date} movingDate - 실제 이사 완료 날짜
 * @param {number} price - 견적 금액 (단위: 원)
 * @param {string} content - 리뷰 본문 내용
 * @param {Date} createdAt - 리뷰 작성일
 * @param {number} rating - 리뷰 별 표시할 점수, 1~5
 *
 * @example
 * <WorkerCardInCompletedReview
 *   serviceType="homeMove"
 *   profileImage="/images/profile.png"
 *   nickname="김이사"
 *   movingDate={new Date('2024-06-01')}
 *   price={210000}
 *   content="친절하고 꼼꼼하게 이사해주셨어요."
 *   createdAt={new Date('2024-06-02')}
 *   rating=5
 * />
 */

function WorkerCardInCompletedReview({
  serviceType,
  profileImage,
  nickname,
  movingDate,
  price,
  content,
  createdAt,
  rating,
}: Props) {
  const formattedMovingDate = movingDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedCreateDate = createdAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col justify-between bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[218px] shadow-xs px-3.5 pt-4 pb-2.5 md:w-[600px] lg:w-[688px] lg:h-[362px] lg:gap-8 lg:py-8 lg:px-6">
      <div className="flex gap-2.5 justify-between">
        <ChipMovingType type={serviceType} />
        {/* 상단 위치 (lg 화면용) */}
        <span className="hidden text-lg text-GrayScale-300 font-normal lg:block">
          {`작성일 ${formattedCreateDate}`}
        </span>
      </div>
      {/* 기사 소개 박스 */}
      <div className="flex justify-between items-center gap-3 shadow-xs bg-GrayScale-50 border-Line-100 border-b-[1px] lg:border-[1px] rounded-md p-2.5 lg:pr-4 h-[78px] lg:gap-7 lg:h-[144px]">
        <UserAvartar imgUrl={profileImage} sizeInLarge={96} />
        <div className="flex-1 flex flex-col justify-between h-[52px] lg:h-[112px] lg:justify-center lg:gap-4">
          {/* 기사 이름 */}
          <div className="flex justify-between">
            <span className="text-[14px] lg:text-2xl">{nickname} 기사님</span>
          </div>
          {/* 이사일, 견적가, 별점 */}
          <div className="flex items-center justify-between md:justify-normal text-[13px] lg:text-xl md:gap-2.5 lg:gap-4 ">
            <span className="flex gap-1.5 lg:gap-3">
              <span className="text-GrayScale-300">이사일</span>
              <span>{formattedMovingDate}</span>
            </span>
            <span className="text-GrayScale-100">|</span>
            <span className="flex gap-1.5 lg:gap-3">
              <span className="text-GrayScale-300">견적가</span>
              <span>{`${price.toLocaleString()}원`}</span>
            </span>
          </div>
          <div className="hidden lg:block">
            {/* 이 컴포넌트 다시보기 */}
            <ButtonStarRating initialRating={rating} disabled={true}/>
          </div>
        </div>
      </div>
      <div className="text-sm text-GrayScale-500 font-normal line-clamp-2 h-[48px] leading-6 lg:text-xl lg:leading-8 lg:h-[64px]">
        {content}
      </div>
      {/* 상단 위치 (s 화면용) */}
      <span className="text-xs text-right text-GrayScale-300 font-normal lg:hidden">
        {`작성일 ${formattedCreateDate}`}
      </span>
    </div>
  );
}

export default WorkerCardInCompletedReview;
