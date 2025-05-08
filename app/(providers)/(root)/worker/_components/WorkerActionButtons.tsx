'use client';
import FavoriteButton from './FavoriteButton';
import RequestEstimateButton from './RequestEstimateButton';

interface WorkerActionButtonsProps {
  workerId: string;
  workerName: string;
}

function WorkerActionButtons({
  workerId,
  workerName,
}: WorkerActionButtonsProps) {
  return (
    <div className='flex flex-1 lg:flex-col gap-8'>
      <p className='text-xl hidden lg:inline'>
        {workerName} 기사님에게 지정 견적을 요청해 보세요!
      </p>
      <div className='min-w-[54px] lg:w-full'>
        <FavoriteButton workerId={workerId} />
      </div>
      <RequestEstimateButton workerId={workerId} />
    </div>
  );
}

export default WorkerActionButtons;
