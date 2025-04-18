import { usePathname } from 'next/navigation';
import TabMenu from '../atoms/TabMenu';

function SubTab() {
  const pathName = usePathname();

  let tabs: { label: string; route: string }[] = [];

  if (pathName.startsWith('/customer/estimates')) {
    tabs = [
      { label: '대기 중인 견적', route: '/customer/estimates/pending' },
      { label: '받았던 견적', route: '/customer/estimates/received' },
    ];
  } else if (pathName.startsWith('/worker/estimates')) {
    tabs = [
      { label: '보낸 견적 조회', route: '/worker/estimates/sending' },
      { label: '반려 요청', route: '/worker/estimates/rejected' },
    ];
  } else if (pathName.startsWith('/customer/reviews')) {
    tabs = [
      { label: '작성 가능한 리뷰', route: '/customer/reviews/pending' },
      { label: '내가 작성한 리뷰', route: '/customer/reviews/submitted' },
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
