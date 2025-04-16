import icAlarm from '@/assets/images/ic-alarm.svg';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

function IconAlarm({ onClick }: Props) {
  return (
    <Image
      src={icAlarm}
      alt="알림"
      className="w-6 h-6 lg:w-9 lg:h-9 cursor-pointer hover:opacity-60 active:opacity-40"
      onClick={onClick}
    />
  );
}

export default IconAlarm;
