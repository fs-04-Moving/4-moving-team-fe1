import icClose from '@/assets/images/ic-x.svg';

type CloseButtonProps = {
  onClick: () => void;
  size?: number;
};

const CloseButton = ({ onClick, size = 24 }: CloseButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      <img src={icClose.src} alt="닫기" width={size} height={size} />
    </button>
  );
};

export default CloseButton;
/* <CloseButton onClose={() => setIsOpen(false)} size={24} /> */
