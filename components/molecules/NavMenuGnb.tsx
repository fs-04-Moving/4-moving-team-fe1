'use client';

import { navMenuItems } from '@/constants/navMenuItems';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import NavMenuItem from '../atoms/NavMenuItem';

function NavMenuGnb() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  const role = user?.role ?? null;

  // 조건에 맞는 메뉴 항목만 추림 + role에 따라 effectiveHref 계산
  const filteredItems = navMenuItems
    .filter(
      (item) =>
        item.showIn?.includes('gnb') &&
        item.condition(role, user?.hasProfile ?? false, isLoggedIn ?? false),
    )
    .map((item) => {
      let effectiveHref = item.href;

      // role에 따라 경로 변경
      if (item.label === '내 견적 관리') {
        if (role === 'customer') {
          effectiveHref = ROUTES.CUSTOMER.ESTIMATES.ROOT;
        } else if (role === 'worker') {
          effectiveHref = ROUTES.WORKER.ESTIMATES.ROOT;
        }
      }

      return { ...item, effectiveHref };
    });

  // 각 role에 따라 GNB에서 강조할 수 있는 경로 정의
  const allowedPathsByRole: Record<string, string[]> = {
    customer: [
      ROUTES.CUSTOMER.ROOT,
      ROUTES.CUSTOMER.ESTIMATES.PENDING,
      ROUTES.CUSTOMER.ESTIMATES.RECEIVED,
      ROUTES.FIND_WORKER,
    ],
    worker: [ROUTES.WORKER.ROOT, ROUTES.WORKER.ESTIMATES.SENDING, ROUTES.WORKER.ESTIMATES.REJECTED],
  };

  // 현재 경로가 허용된 GNB 강조 경로에 정확히 일치하는지 확인
  const isWithinAllowedPath = allowedPathsByRole[role ?? '']?.some(
    (basePath) => pathname === basePath,
  );

  // 가장 잘 매칭되는 href 하나만 선택되게 처리
  const bestMatchHref = isWithinAllowedPath
    ? filteredItems
        .map((item) => item.effectiveHref)
        .filter((href): href is string => !!href)
        .sort((a, b) => b.length - a.length) // 긴 href 우선
        .find((href) => pathname === href || pathname.startsWith(`${href}/`))
    : null;

  return (
    <div className="w-full pl-20 gap-10 hidden lg:flex">
      {filteredItems.map((item, index) => {
        // 허용된 경로 안이면 bestMatch만 강조, 그 외에는 모두 강조
        const isSelected = isWithinAllowedPath ? item.effectiveHref === bestMatchHref : true;

        return (
          <NavMenuItem
            key={index}
            isSelected={isSelected}
            onClick={() => item.onClick(router, role)}
          >
            {item.label}
          </NavMenuItem>
        );
      })}
    </div>
  );
}

export default NavMenuGnb;

// 'use client';

// import { navMenuItems } from '@/constants/navMenuItems';
// import ROUTES from '@/constants/routes';
// import { useAuth } from '@/contexts/AuthContext';
// import { usePathname, useRouter } from 'next/navigation';
// import NavMenuItem from '../atoms/NavMenuItem';

// function NavMenuGnb() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, isLoggedIn } = useAuth();

//   // 조건에 맞는 메뉴 항목만 추림 + role에 따라 effectiveHref 계산
//   const filteredItems = navMenuItems
//     .filter(
//       (item) =>
//         item.showIn?.includes('gnb') &&
//         item.condition(
//           user?.role ?? null,
//           user?.hasProfile ?? false,
//           isLoggedIn ?? false
//         )
//     )
//     .map((item) => {
//       let effectiveHref = item.href;

//       if (item.label === '내 견적 관리') {
//         if (user?.role === 'customer') {
//           effectiveHref = ROUTES.CUSTOMER.ESTIMATES.ROOT;
//         } else if (user?.role === 'worker') {
//           effectiveHref = ROUTES.WORKER.ESTIMATES.ROOT;
//         }
//       }

//       return { ...item, effectiveHref };
//     });

//   // 가장 잘 매칭되는 href 하나만 선택되게 처리
//   const bestMatchHref = filteredItems
//     .map((item) => item.effectiveHref)
//     .filter((href): href is string => !!href)
//     .sort((a, b) => b.length - a.length) // 긴 href 우선
//     .find((href) => pathname === href || pathname.startsWith(`${href}/`));

//   return (
//     <div className="w-full pl-20 gap-10 hidden lg:flex">
//       {filteredItems.map((item, index) => {
//         const isSelected = item.effectiveHref === bestMatchHref;

//         return (
//           <NavMenuItem
//             key={index}
//             isSelected={isSelected}
//             onClick={() => item.onClick(router, user?.role ?? null)}
//           >
//             {item.label}
//           </NavMenuItem>
//         );
//       })}
//     </div>
//   );
// }

// export default NavMenuGnb;
