import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
}

const IconButton = ({ src, alt }: IconButtonProps) => {
  return (
    <button type="button">
      <img src={src} alt={alt} />
    </button>
  );
};

export default IconButton;

/*<IconButton 
src='@/assets/images/ic-alarm.svg'
alt ='알람 버튼'
onClick={/AlarmMenu} /> */
