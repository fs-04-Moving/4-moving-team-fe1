'use client';

import authApi from '@/api/auth/auth.api';
import userApi from '@/api/user/user.api';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { GetUserMe } from '@/types/dtos/user.dto';
import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextValue {
  isLoggedIn?: boolean;
  isAuthInitialized?: boolean;
  logIn?: () => void;
  logOut?: () => void;
  user?: GetUserMe;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isAuthInitialized: false,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

/**
 * - SSR로 받은 유저 정보(user)가 있다면 isLoggedIn = true로 초기화
 * - useEffect로 user 상태에 따라 isLoggedIn, isAuthInitialized 세팅
 * - isAuthInitialized가 false일 땐 아무 것도 하지 않도록
 * @param param0
 * @returns
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // const router = useRouter();

  const userQueryClient = getBrowserQueryClient({
    queries: {
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신,
      retry: 0,
    },
  });

  // accessToken 존재 여부 확인 후 isAuthInitialized 설정
  useEffect(() => {
    // const accessToken =
    //   typeof window !== 'undefined'
    //     ? localStorage.getItem('accessToken')
    //     : null;

    // if (!accessToken) {
    //   setIsLoggedIn(false);
    // }

    setIsAuthInitialized(true); // accessToken 여부와 상관없이 초기화는 완료
  }, []);

  // isAuthInitialized가 true일 때만 getUserMe 실행
  const { data: user } = useQuery<GetUserMe>({
    queryFn: userApi.getUserMe,
    queryKey: ['me'],
    staleTime: Infinity,
    enabled: isAuthInitialized,
    retry: 0,
  });

  useEffect(() => {
    // if (user) {
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
    setIsLoggedIn(!!user);
  }, [user]);

  const logIn = async () => {
    setIsLoggedIn(true);
    setIsAuthInitialized(true);

    // 로그인 후 accessToken이 생기므로 쿼리 재실행
    await userQueryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const logOut = async () => {
    await authApi.logOut();
    // logoutHelper(() => router.replace('/'));
    setIsLoggedIn(false);
    setIsAuthInitialized(true); // 로그아웃도 초기화 완료로 처리
    await userQueryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const value: AuthContextValue = {
    isLoggedIn,
    isAuthInitialized,
    logIn,
    logOut,
    user: user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
