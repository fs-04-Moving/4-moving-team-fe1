import { useMediaQuery } from 'react-responsive';

export default function useDeviceSize() {
  const isDeskTop = useMediaQuery({ query: '(min-width: 1400px)' }); // lg 이상
  const isTablet = useMediaQuery({
    query: '(min-width: 744px) and (max-width: 1399px)', // md 이상 lg 미만
  });
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' }); // md 미만

  return { isDeskTop, isTablet, isMobile };
}
