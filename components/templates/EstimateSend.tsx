import { ChangeEvent, useState } from 'react';
import CustomerCardInEstimateModal from '../organisms/CustomerCardInEstimateModal';

interface Props {
  onClose: () => void;
}

function EstimateSend(props: Props) {
  const { onClose } = props;

  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState('');

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const NumberInputValue = Number(e.target.value);
    setPrice(NumberInputValue);
  };

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div
      className="
      flex flex-col 
      gap-y-[24px] sm:gap-y-[40px]
      px-6 mt-8 mb-10
    "
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[18px] sm:text-[24px]">견적 보내기</h1>
        <button className="text-[18px] sm:text-[24px]" onClick={onClose}>
          ×
        </button>
      </div>
      <CustomerCardInEstimateModal
        serviceType="smallMove"
        status="general"
        customerName="김인서"
        movingDate={new Date('2025-07-01')}
        departure="서울시 중구"
        destination="경기도 수원시"
        isConfirmed={false}
        requestDate={new Date('2025-06-30')}
        price={210000}
        onSendEstimate={() => console.log('견적 보내기')}
        onReject={() => console.log('반려')}
        onViewDetail={() => console.log('상세보기')}
      />
      <div className="text-[16px] font-[600] flex flex-col gap-y-2">
        <h4>견적가를 입력해 주세요.</h4>
        <input
          name="detailReview"
          className="px-4 py-4 text-[#ABABAB] bg-[#F7F7F7] rounded outline-none w-full h-[160px] max-h-[160px]"
          value={price}
          onChange={onChangePrice}
        />
      </div>
      <div className="text-[16px] font-[600] flex flex-col gap-y-2">
        <h4>코맨트를 입력해 주세요.</h4>
        <textarea
          name="detailReview"
          className="px-4 py-4 text-[#ABABAB] bg-[#F7F7F7] rounded outline-none w-full h-[160px] max-h-[160px]"
          value={comment}
          onChange={onChangeComment}
          placeholder="최소 10자 이상 입력해주세요"
        />
      </div>
    </div>
  );
}

export default EstimateSend;
