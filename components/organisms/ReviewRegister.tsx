'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import reviewApi from '@/api/review/review.api';
import ButtonSolid from '../atoms/ButtonSolid';
import ButtonStarRating from '../molecules/ButtonStarRating';
import { Worker } from '@/types/dtos/Worker.dto';
import WorkerSummaryCardInModal from './WorkerSummaryCardInModal';
import { ServiceType } from '@/types/move.type';

interface Props {
  onClose: () => void;
  driverId: string;
  estimateId: string;
  serviceType: ServiceType;
  movingDate: Date;
  price: number;
}

function ReviewRegister({ onClose, driverId, estimateId, serviceType, movingDate, price }: Props) {
  const [driver, setDriver] = useState<Worker | null>(null);
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>('');

  const queryClient = useQueryClient();

  // ✅ 기사 정보 가져오기
  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const profile = await reviewApi.getWorkerProfile(driverId);
        setDriver(profile);
      } catch (error) {
        console.error('기사 정보 불러오기 실패', error);
      }
    };
    fetchDriverProfile();
  }, [driverId]);

  // ✅ 리뷰 등록 뮤테이션
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      reviewApi.createReview({
        estimateId,
        content: content.trim(),
        rating,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', estimateId] });
      alert('리뷰가 성공적으로 등록되었습니다.');
      onClose();
    },
    onError: (err) => {
      console.error('리뷰 등록 실패', err);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (!driver || content.trim().length < 10) return;
    mutate(); // ✅ react-query 사용
  };

  if (!driver) return <div>기사 정보를 불러오는 중입니다...</div>;

  return (
    <div className="w-full p-4 flex flex-col gap-y-[26px] lg:gap-y-10 ">
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] lg:text-[24px] font-[400]">리뷰 쓰기</h2>
        <button className="text-[#999999] text-lg font-semibold" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="w-full flex flex-col gap-y-8 mb-5">
        <WorkerSummaryCardInModal
          serviceType={serviceType}
          profileImage={driver.profileImage}
          nickname={driver.nickname}
          movingDate={new Date(movingDate)}
          price={price}
          createdAt={new Date('2022-02-22')}
        />
        <div className="text-[16px] font-[600] flex flex-col gap-y-2">
          <h4 className="font-[600] text-[16px] lg:text-[20px]">평점을 선택해 주세요.</h4>
          <ButtonStarRating disabled={false} initialRating={rating} setRating={setRating} />
        </div>
        <div className="w-full text-[16px] font-[600] flex flex-col gap-y-2">
          <h4 className="font-[600] text-[16px] lg:text-[20px]">상세 후기를 작성해 주세요.</h4>
          <textarea
            name="detailReview"
            className="px-4 py-4 text-[#ABABAB] bg-[#F7F7F7] text-[16px] lg:text-[20px] rounded outline-none w-full h-[160px] max-h-[160px]"
            value={content}
            onChange={onChangeContent}
            placeholder="최소 10자 이상 입력해주세요."
          />
          {content.trim().length > 0 && content.trim().length < 10 && (
            <p className="text-[12px] text-red-500">최소 10자 이상 입력해주세요.</p>
          )}
        </div>
      </div>
      <div>
        <ButtonSolid onClick={handleSubmit} disabled={content.trim().length < 10 || isPending}>
          {isPending ? '등록 중...' : '리뷰 등록'}
        </ButtonSolid>
      </div>
    </div>
  );
}

export default ReviewRegister;
