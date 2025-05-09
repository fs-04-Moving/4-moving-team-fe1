import ChipEstimateStatus from '@/components/atoms/ChipEstimateStatus';
import ChipMovingType from '@/components/atoms/ChipMovingType';
import ChipText from '@/components/atoms/ChipText';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { EstimateStatus } from '@/types/move.type';

type Props = {
  customerName: string;
  movingDate: Date;
  departure: string;
  destination: string;
  serviceType: string;
  status: EstimateStatus;
};

export default function EstimateSummaryCard({
  customerName,
  movingDate,
  departure,
  destination,
  serviceType,
  status,
}: Props) {
  const formattedMovingDate = format(movingDate, 'yyyy. MM. dd(eee)', {
    locale: ko,
  });

  return (
    <div className="bg-white rounded-[16px] shadow-sm p-6 flex flex-col mb-10 lg:w-[955px] gap-4">
      <div className="flex items-center gap-4">
        <ChipMovingType type={serviceType} />
        <ChipEstimateStatus type={status} />
      </div>

      <div className="flex flex-col text-sm text-gray-700 gap-4 px-[18px] py-4">
        <div className="w-full">
          <h2 className="text-[20px] font-semibold">{customerName} 고객님</h2>
        </div>
        <div>
          <hr className="border-t border-gray-100" />
        </div>

        <div className="flex flex-wrap gap-x-3 items-center">
          <ChipText>이사일</ChipText>
          <span>{formattedMovingDate}</span>
          <span className="text-gray-200">|</span>
          <ChipText>출발</ChipText>
          <span>{departure}</span>
          <span className="text-gray-200">|</span>
          <ChipText>도착</ChipText>
          <span>{destination}</span>
        </div>
      </div>
    </div>
  );
}
