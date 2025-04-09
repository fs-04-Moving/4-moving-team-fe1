import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
}

const IconButton = ({ src, alt, ...props }: IconButtonProps) => {
  return (
    <button type="button" {...props}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default IconButton;
