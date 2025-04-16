'use client';

import authApi from '@/api/auth/auth.api';
import { client } from '@/api/client';
import userApi from '@/api/user/user.api';
import { getBrowserQueryClient } from '@/libs/tanstack-query/reactQueryConfig';
import { GetUserMe } from '@/types/dtos/user.dto';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// export interface User {
//   name: string;
//   profileImage?: string;
//   hasProfile: boolean;
//   hasRequest: boolean;
//   role: Role;
// }

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

  const userQueryClient = getBrowserQueryClient({
    queries: {
      staleTime: Infinity, // 사용자가 로그아웃 후 재로그인하거나 정보를 변경할 때에만 갱신,
      retry: 0,
    },
  });
  const { data: user } = useQuery<GetUserMe>({
    queryFn: userApi.getUserMe,
    queryKey: ['me'],
  });

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsAuthInitialized(true);
  }, [user]);

  const logIn = () => {
    setIsLoggedIn(true);
    setIsAuthInitialized(true);
  };

  const logOut = async () => {
    // 쿠키 방식으로 로그아웃
    try {
      await authApi.logOut();
    } catch (e) {
      console.error('서버 로그아웃 실패', e);
    }
    client.defaults.headers['Authorization'] = '';
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setIsAuthInitialized(true); // 로그아웃도 초기화 완료로 처리
    userQueryClient.removeQueries({ queryKey: ['me'] });
    router.replace('/');
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
