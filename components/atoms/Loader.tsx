import { BeatLoader } from 'react-spinners';

interface Props {
  color?: string;
  size?: number;
}

function Loader({ color = '#ffffff', size = 7 }: Props) {
  return <BeatLoader color={color} size={size} />;
}

export default Loader;
