"use client";
import { ChangeEvent, useState } from "react";
import { ReceivedEstimateRequest } from "./ReceivedRequests";
import ChipMovingType from "../atoms/ChipMovingType";
import ChipEstimateStatus from "../atoms/ChipEstimateStatus";
import ChipText from "../atoms/ChipText";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import TextArea from "../atoms/TextArea";
import ButtonSolid from "../atoms/ButtonSolid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import workerEstimateApi from "@/api/estimate/workerOnly/estimate.api";

interface Props {
  onClose: () => void;
  request: ReceivedEstimateRequest | null;
}

function EstimateRejectSend(props: Props) {
  const { onClose, request } = props;

  const queryClient = useQueryClient();
  const { mutate: rejectEstimate } = useMutation({
    mutationFn: () =>
      workerEstimateApi.rejectEstimate(
        { rejectionMessage: comment },
        request?.estimateId as string
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receivedEstimateRequests"] });
    },
  });

  const [comment, setComment] = useState("");

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const formatDateFnsKorean = (date: Date): string => {
    const formatted = format(date, "yyyy. MM. dd", { locale: ko });
    const day = format(date, "eee", { locale: ko }); // '월', '화' 등
    return `${formatted}(${day})`;
  };

  if (request === null) return;

  const formattedMovingDate = formatDateFnsKorean(request.movingDate);

  return (
    <form
      className="
      flex flex-col 
      gap-[26px] sm:gap-10
      rounded-4xl
      lg:w-full
      w-[375px]
    "
      onSubmit={() => rejectEstimate()}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[18px] lg:text-[24px] font-semibold">요청반려</h1>
        <button className="text-[18px] sm:text-[24px]" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col lg:gap-[32px] gap-5">
        {/* 칩부터 출발 도착 */}
        <div className="flex flex-col  gap-6">
          <div className="flex gap-[14px] items-center">
            <ChipMovingType type={request.serviceType} />
            {status === "assigned" ? (
              <ChipEstimateStatus type="assigned" isShort={true} />
            ) : (
              ""
            )}
          </div>
          <div className="lg:px-[18px] lg:py-6 py-[10px] border-[1px] border-[#F2F2F2] lg:shadow-[4px_4px_16px_0px_#E9E9E9]">
            <div className=" flex flex-col lg:gap-4 gap-[6px]">
              <h2 className="text-[14px] font-semibold lg:text-2xl">{`${request.customerName} 고객님`}</h2>
              <div className="flex flex-col lg:gap-[14px] gap-2">
                {/* 이사일일 */}
                <div className="flex lg:gap-3 gap-2 font-medium lg:text-[18px] text-[14px]">
                  <ChipText>이사일</ChipText>
                  <span className="flex items-center">
                    {formattedMovingDate}
                  </span>
                </div>
                {/* 출발 및 도착일 */}
                <div className="flex md:items-center gap-[14px] lg:gap-4">
                  <div className="flex gap-2 lg:gap:3 items-center">
                    <ChipText>출발</ChipText>
                    {/* <span>{request.departure}</span> */}
                    <span>부산 해운대구</span>
                  </div>

                  <span className="text-GrayScale-200">|</span>
                  <div className="flex gap-2 lg:gap:3 items-center">
                    <ChipText>도착</ChipText>
                    {/* <span>{request.destination}</span> */}
                    <span>부산 해운대구</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 코멘트를 입력 ~*/}
        <div>
          <h2 className="text-[16px] lg:text-[20px] font-semibold">
            반려 사유를 입력해 주세요
          </h2>
          <TextArea
            bgColor={true}
            placeholder="최소 10자 이상 입력해주세요"
            value={comment}
            onBlur={() => {}}
            onChange={onChangeComment}
          />
        </div>
      </div>

      <ButtonSolid disabled={comment === ""}>반려하기</ButtonSolid>
    </form>
  );
}

export default EstimateRejectSend;
