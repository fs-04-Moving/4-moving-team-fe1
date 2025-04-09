import Link from 'next/link';

/*
to에 이동 경로 /login
text에 사용할 텍스트 입력
*/

interface NavigationTextProps {
  to: string;
  text: string;
  className?: string;
}

const NavigationText = ({ to, text }: NavigationTextProps) => {
  return <Link href={to}>{text}</Link>;
};

export default NavigationText;
