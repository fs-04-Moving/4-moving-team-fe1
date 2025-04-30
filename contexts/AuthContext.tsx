'use client';

import authApi from '@/api/auth/auth.api';
import userApi from '@/api/user/user.api';
import ROUTES from '@/constants/routes';
import { GetUserMe } from '@/types/dtos/user.dto';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  logIn?: () => Promise<void>;
  logOut?: () => Promise<void>;
  user?: GetUserMe;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isAuthInitialized: false,
  logIn: async () => {},
  logOut: async () => {},
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

  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
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
    console.log('user:', user);
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const logIn = async () => {
    console.log('login 시작');
    setIsLoggedIn(true);
    setIsAuthInitialized(true);

    // 로그인 후 accessToken이 생기므로 쿼리 재실행
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const logOut = async () => {
    await authApi.logOut();
    router.replace(ROUTES.HOME);
    setIsLoggedIn(false);
    setIsAuthInitialized(true); // 로그아웃도 초기화 완료로 처리
    await queryClient.invalidateQueries({ queryKey: ['me'] });
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
