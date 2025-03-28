import icBox from '@/assets/images/ic-box.svg';
import icHome from '@/assets/images/ic-home.svg';
import icCompany from '@/assets/images/ic-company.svg';
import icDocument from '@/assets/images/ic-document.svg';
import Image from 'next/image';

interface ChipProps {
  type: '소형이사' | '가정이사' | '사무실이사' | '지정견적요청' | '견적대기';
}

function ChipMoveType({ type }: ChipProps) {
  const config = {
    소형이사: {
      icon: <Image src={icBox} width={20} alt={'box'} />,
      text: '소형이사',
      color: 'bg-[#E9F4FF] text-[#1B92FF] ',
    },
    가정이사: {
      icon: <Image src={icHome} width={20} alt={'box'} />,
      text: '가정이사',
      color: 'bg-[#E9F4FF] text-[#1B92FF] ',
    },
    사무실이사: {
      icon: <Image src={icCompany} width={20} alt={'box'} />,
      text: '사무실이사',
      color: 'bg-[#E9F4FF] text-[#1B92FF] ',
    },
    지정견적요청: {
      icon: <Image src={icDocument} width={20} alt={'box'} />,
      text: '지정 견적 요청',
      color: 'bg-[#FFEEF0] text-[#FF4F64] ',
    },
    견적대기: {
      icon: '',
      text: '견적 대기',
      color: 'bg-[#F2F3F8] text-[#242945] ',
    },
  };

  const { icon, text, color } = config[type];
  return (
    <div
      className={`flex items-center gap-0.5 rounded-sm h-[26px] text-[13px] px-1 pr-1 font-semibold w-fit ${color}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default ChipMoveType;
