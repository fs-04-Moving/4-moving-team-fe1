'use client';

import { useAuth } from '@/contexts/AuthContext';
import GuestMenu from '../molecules/GuestMenu';
import LoggedInMenu from '../molecules/LoggedInMenu';

interface Props {
  onOpenMenu: () => void;
}

/**
 * 상단 Gnb 메뉴(헤더) 우측에 있는 버튼 컴포넌트
 * - 로그인 시에는 사용자 정보와 알람 버튼을, 비로그인 시에는 로그인 버튼을 표시
 * - 태블릿/모바일에서는 메뉴 버튼 표시
 * @param param0 onOpenMenu: 태블릿/모바일에서 사용하는 우측 슬라이드 메뉴 토글 함수
 * @returns
 */
function ButtonAuth({ onOpenMenu }: Props) {
  const { user } = useAuth();

  return user ? (
    <LoggedInMenu user={user} onOpenMenu={onOpenMenu} />
  ) : (
    <GuestMenu onOpenMenu={onOpenMenu} />
  );
}

export default ButtonAuth;

// 'use client';

// import { useAuth } from '@/contexts/AuthContext';
// import GuestMenu from '../molecules/GuestMenu';
// import LoggedInMenu from '../molecules/LoggedInMenu';

// interface Props {
//   onOpenMenu: () => void;
// }

// /**
//  * 상단 Gnb 메뉴(헤더) 우측에 있는 버튼 컴포넌트
//  * - 로그인 시에는 사용자 정보와 알람 버튼을, 비로그인 시에는 로그인 버튼을 표시
//  * - 태블릿/모바일에서는 메뉴 버튼 표시
//  * @param param0 onOpenMenu: 태블릿/모바일에서 사용하는 우측 슬라이드 메뉴 토글 함수
//  * @returns
//  */
// function ButtonAuth({ onOpenMenu }: Props) {
//   // const { data: user } = useQuery<GetUserMe>({
//   //   queryFn: userApi.getUserMe,
//   //   queryKey: ['me'],
//   //   staleTime: Infinity,
//   //   retry: 0,
//   // });

//   /**
//    * 특별히 사용하는 것 같지 않은 useAuth()를 호출한 이유는?
//    *
//    * - 현재 user의 유무로 조건부 렌더링을 적용하고 있음
//    * - 그런데 실제 useQuery로 가져온 user가 바뀌어도 ButtonAuth는 리렌더링되지 않을 수 있음
//    * - AuthProvider가 먼저 렌더되면서 ['me'] 쿼리를 hydrate하고 useQuery로 불러와서
//    * - Tanstack Query에 다시 올려줌
//    * - 그런데 이때 ButtonAuth도 동시에 렌더되면서 useQuery(['me'])를 호출하면
//    *   - Tanstack Query가 내부적으로는 SSR데이터를 가지고 있지만
//    *   - 아직 useQuery가 그걸 인식해서 전달해주기까지의 짧은 텀이 생길 수 있다.
//    * - 그런 이유로 user의 변화만으로 ButtonAuth의 리렌더링이 트리거되지 않을 수 있음
//    * - 그런데 useAuth를 사용하면
//    * - AuthProvider의 useQuery가 먼저 실행되고 캐싱되어 정상적으로 트리거됨
//    * -
//    * - 결론적으로 어차피 useAuth를 호출하지 않으면 작동하지 않으므로
//    * - useQuery를 사용하지 않고,
//    * - useAuth에 user를 추가하여 해당값을 호출하여 렌더링을 분기하면 문제 해결됨

//    * - [별첨]
//    * - isLoggedIn을 렌더링 조건에 사용하지 않는 이유는?
//    * - isLoggedIn은 user가 fetch된 후에 true로 세팅되는 값이므로 더 느리다.
//    * - 따라서 '로그인' 버튼이 잠깐 보이면서 깜박이게 됨
//    */
//   const { user } = useAuth();

//   return user ? (
//     <LoggedInMenu user={user} onOpenMenu={onOpenMenu} />
//   ) : (
//     <GuestMenu onOpenMenu={onOpenMenu} />
//   );
// }

// export default ButtonAuth;
