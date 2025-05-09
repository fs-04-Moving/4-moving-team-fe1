'use client';
import ButtonSolid from '@/components/atoms/ButtonSolid';
import { useRouter } from 'next/navigation';

interface RequestEstimateButtonProps {
  workerId: string;
}

function RequestEstimateButton({ workerId }: RequestEstimateButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/estimate/assigned/${workerId}`);
  };

  return <ButtonSolid onClick={handleClick}>지정 견적 요청하기</ButtonSolid>;
}
export default RequestEstimateButton;
