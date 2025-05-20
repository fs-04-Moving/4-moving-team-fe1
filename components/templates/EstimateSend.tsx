'use client';
import { ChangeEvent, useState } from 'react';
import { ReceivedEstimateRequest } from './ReceivedRequests';
import ChipMovingType from '../atoms/ChipMovingType';
import ChipEstimateStatus from '../atoms/ChipEstimateStatus';
import ChipText from '../atoms/ChipText';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import ButtonSolid from '../atoms/ButtonSolid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import workerEstimateApi from '@/api/estimate/workerOnly/estimate.api';

interface Props {
  onClose: () => void;
  request: ReceivedEstimateRequest | null;
}

function EstimateSend(props: Props) {
  const { onClose, request } = props;

  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const { mutate: priceEstimate } = useMutation({
    mutationFn: () => {
      if (request?.estimateId) {
        return workerEstimateApi.priceEstimate({ comment, price }, request?.estimateId as string);
      } else {
        return workerEstimateApi.createGeneralEstimate(
          { comment, price },
          request?.customerId as string,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receivedEstimateRequests'] });
    },
  });

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      setPrice(Number(value));
    }
  };

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const formatDateFnsKorean = (date: Date): string => {
    const formatted = format(date, 'yyyy. MM. dd', { locale: ko });
    const day = format(date, 'eee', { locale: ko }); // '월', '화' 등
    return `${formatted}(${day})`;
  };

  const formatNumberWithComma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!request) return null;

  const formattedMovingDate = formatDateFnsKorean(request.movingDate);
  const formattedDeparture = request.departure.split(' ').slice(0, 2).join(' ');
  const formattedDestination = request.destination.split(' ').slice(0, 2).join(' ');

  return (
    <form
      className="
      flex flex-col 
      gap-[26px] sm:gap-10
      rounded-4xl
      w-full
    "
      onSubmit={() => {
        priceEstimate();
      }}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[18px] lg:text-[24px] font-semibold">견적 보내기</h1>
        <button type="button" className="text-[18px] sm:text-[24px]" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col lg:gap-[32px] gap-5">
        {/* 칩부터 출발 도착 */}
        <div className="flex flex-col  gap-6">
          <div className="flex gap-[14px] items-center">
            <ChipMovingType type={request.serviceType} />
            {status === 'assigned' ? <ChipEstimateStatus type="assigned" isShort={true} /> : ''}
          </div>
          <div className="lg:px-[18px] lg:py-6 py-[10px] border-[1px] border-[#F2F2F2] lg:shadow-[4px_4px_16px_0px_#E9E9E9]">
            <div className=" flex flex-col lg:gap-4 gap-[6px]">
              <h2 className="text-[14px] font-semibold lg:text-2xl">{`${request.customerName} 고객님`}</h2>
              <div className="flex flex-col lg:gap-[14px] gap-2">
                {/* 이사일일 */}
                <div className="flex lg:gap-3 gap-2 font-medium lg:text-[18px] text-[14px]">
                  <ChipText>이사일</ChipText>
                  <span className="flex items-center">{formattedMovingDate}</span>
                </div>
                {/* 출발 및 도착일 */}
                <div className="flex md:items-center gap-[14px] lg:gap-4">
                  <div className="flex gap-2 lg:gap:3 items-center">
                    <ChipText>출발</ChipText>
                    {/* <span>{request.departure}</span> */}
                    <span>{formattedDeparture}</span>
                  </div>

                  <span className="text-GrayScale-200">|</span>
                  <div className="flex gap-2 lg:gap:3 items-center">
                    <ChipText>도착</ChipText>
                    {/* <span>{request.destination}</span> */}
                    <span>{formattedDestination}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 견적가를 ~*/}
        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] lg:text-[20px] font-semibold">견적가를 입력해 주세요</h2>
          <Input
            bgColor={true}
            placeholder="견적가 입력"
            value={formatNumberWithComma(price)}
            onChange={onChangePrice}
          />
        </div>
        {/* 코멘트를 입력 ~*/}
        <div>
          <h2 className="text-[16px] lg:text-[20px] font-semibold">코멘트를 입력해 주세요</h2>
          <TextArea
            bgColor={true}
            placeholder="최소 10자 이상 입력해주세요"
            value={comment}
            onBlur={() => {}}
            onChange={onChangeComment}
          />
        </div>
      </div>

      <ButtonSolid disabled={price === 0 || comment.length < 10}>견적보내기</ButtonSolid>
    </form>
  );
}

export default EstimateSend;
