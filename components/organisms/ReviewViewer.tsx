'use client';

import { Review } from '@/types/dtos/review.dto'; 
import { ServiceType } from '@/types/move.type'; 
import ButtonStarRating from '../molecules/ButtonStarRating'; 
import WorkerSummaryCardInModal from './WorkerSummaryCardInModal'; 

interface Props {
    onClose: () => void;
    review: Review; 
}

function ReviewViewer({ onClose, review }: Props) {

    const {
        serviceType,
        profileImage,
        nickname,
        movingDate,
        price,
        content,
        createdAt, 
        star 
    } = review;

    return (
        <div className="w-full p-4 flex flex-col gap-y-[26px] lg:gap-y-10 ">
            <div className="flex justify-between items-center">
                <h2 className="text-[18px] lg:text-[24px] font-[400]">작성한 리뷰 보기</h2>
                <button className="text-[#999999] text-lg font-semibold" onClick={onClose}>
                    ✕
                </button>
            </div>
            <div className="w-full flex flex-col gap-y-8 mb-5">
                <WorkerSummaryCardInModal
                    serviceType={serviceType as ServiceType} 
                    profileImage={profileImage}
                    nickname={nickname}
                    movingDate={new Date(movingDate)}
                    price={price}
                    createdAt={new Date(createdAt)} 
                />
                <div className="text-[16px] font-[600] flex flex-col gap-y-2">
                    <h4 className="font-[600] text-[16px] lg:text-[20px]">평점</h4>
                    <ButtonStarRating disabled={true} initialRating={star} setRating={() => {}} /> 
                </div>
                <div className="w-full text-[16px] font-[600] flex flex-col gap-y-2">
                    <h4 className="font-[600] text-[16px] lg:text-[20px]">상세 후기</h4>
                    <textarea
                        name="detailReview"
                        className="px-4 py-4 text-[#444] bg-[#F7F7F7] text-[16px] lg:text-[20px] rounded outline-none w-full h-[160px] max-h-[160px] resize-none" // resize-none 추가로 크기 조절 방지
                        value={content} 
                        readOnly={true} 
                        disabled={true} 
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewViewer;