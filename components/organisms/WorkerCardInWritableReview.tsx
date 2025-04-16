import UserAvartar from '../atoms/UserAvartar';
import ChipMovingType from '../atoms/ChipMovingType';
import { ServiceType } from '@/types/move.type';
import ButtonSolid from '../atoms/ButtonSolid';

type Props = {
  serviceType: ServiceType;
  profileImage: string;
  nickname: string;
  movingDate: Date;
  price: number;
  isReviewWritten: boolean;
  onClickWriteReview?: () => void;
};

/**
 * WorkerCardInWritableReview 컴포넌트
 *
 * 리뷰 작성이 가능한 이사 견적 카드 컴포넌트입니다.
 * 기사 프로필, 서비스 유형, 이사일, 견적가 정보와 함께 '리뷰 작성하기' 버튼을 제공합니다.
 * 리뷰가 이미 작성된 경우 버튼이 비활성화되고 '리뷰 작성 완료'로 변경됩니다.
 * 반응형 레이아웃을 지원하며 다양한 화면 크기에 맞춰 버튼 및 레이아웃이 조정됩니다.
 *
 * @param {ServiceType} serviceType - 이사 서비스 유형 (예: 'smallMove', 'homeMove', 'officeMove')
 * @param {string} profileImage - 기사 프로필 이미지 URL
 * @param {string} nickname - 기사 닉네임
 * @param {Date} movingDate - 이사 완료 날짜
 * @param {number} price - 견적 금액 (단위: 원)
 * @param {boolean} isReviewWritten - 리뷰 작성 여부 (true: 이미 작성됨)
 * @param {() => void} [onClickWriteReview] - 리뷰 작성 버튼 클릭 시 실행할 함수
 *
 * @example
 * <WorkerCardInWritableReview
 *   serviceType="smallMove"
 *   profileImage="/img/sample.jpg"
 *   nickname="김이사"
 *   movingDate={new Date('2024-07-01')}
 *   price={210000}
 *   isReviewWritten={false}
 *   onClickWriteReview={() => setModalOpen(true)}
 * />
 */

function WorkerCardInWritableReview({
  serviceType,
  profileImage,
  nickname,
  movingDate,
  price,
  isReviewWritten,
  onClickWriteReview,
}: Props) {
  const formattedMovingDate = movingDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col justify-between bg-GrayScale-50 border-Line-100 border-[0.5px] rounded-2xl w-[327px] h-[208px] px-3.5 pt-4 pb-2.5 md:w-[600px] lg:w-[688px] lg:h-[362px] lg:gap-8 lg:py-8 lg:px-6">
      <div className="flex gap-2.5 justify-between">
        <ChipMovingType type={serviceType} />
      </div>
      {/* 기사 소개 박스 */}
      <div className="flex justify-between items-center gap-3 bg-GrayScale-50 border-Line-100 rounded-md p-2.5 lg:border-[1px] lg:pr-4 h-[78px] lg:gap-7 lg:h-[144px]">
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
        </div>
      </div>
      <ButtonSolid disabled={isReviewWritten} onClick={onClickWriteReview}>
        {isReviewWritten ? '리뷰 작성 완료' : '리뷰 작성 하기'}
      </ButtonSolid>
    </div>
  );
}

export default WorkerCardInWritableReview;
