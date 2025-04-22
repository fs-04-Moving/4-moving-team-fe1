import ROUTES from '@/constants/routes';
import { usePathname } from 'next/navigation';
import TabMenu from '../atoms/TabMenu';

function SubTab() {
  const pathName = usePathname();

  let tabs: { label: string; route: string }[] = [];

  if (pathName.startsWith(ROUTES.CUSTOMER.ESTIMATES.ROOT)) {
    tabs = [
      { label: '대기 중인 견적', route: ROUTES.CUSTOMER.ESTIMATES.PENDING },
      { label: '받았던 견적', route: ROUTES.CUSTOMER.ESTIMATES.RECEIVED },
    ];
  } else if (pathName.startsWith(ROUTES.WORKER.ESTIMATES.ROOT)) {
    tabs = [
      { label: '보낸 견적 조회', route: ROUTES.WORKER.ESTIMATES.SENDING },
      { label: '반려 요청', route: ROUTES.WORKER.ESTIMATES.REJECTED },
    ];
  } else if (pathName.startsWith(ROUTES.CUSTOMER.REVIEWS.ROOT)) {
    tabs = [
      { label: '작성 가능한 리뷰', route: ROUTES.CUSTOMER.REVIEWS.PENDING },
      { label: '내가 작성한 리뷰', route: ROUTES.CUSTOMER.REVIEWS.SUBMITTED },
    ];
  }

  if (tabs.length === 0) return null;

  return (
    <div className="flex w-[327px] md:w-[600px] lg:w-[1400px] items-end h-16 lg:h-20">
      <TabMenu tabs={tabs} />
    </div>
  );
}

export default SubTab;
