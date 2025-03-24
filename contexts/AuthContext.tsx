'use client';

import { client } from '@/api/client';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    // client 요청 header에서 토큰 제거
    client.defaults.headers['Authorization'] = '';

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  // 로그인된 상태에서 로그인 또는 회원가입 페이지에 접근하면 마켓플레이스(홈) 페이지로 이동
  useEffect(() => {
    if (
      isLoggedIn &&
      (pathName === '/auth/sign-up' || pathName === '/auth/log-in')
    ) {
      router.replace('/');
    }
  }, [isLoggedIn, pathName, router]);

  // 로그아웃된 상태에서 로그인/회원가입/마켓플레이스 외의 페이지에 있을 경우 마켓플레이스 페이지로 이동
  // useEffect(() => {
  //   if (
  //     !isLoggedIn &&
  //     !(pathName === '/auth/sign-up' || pathName === '/auth/log-in')
  //   ) {
  //     router.replace('/');
  //   }
  // }, [isLoggedIn, pathName, router]);

  useEffect(() => {
    async function initAuthStatus() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        setIsLoggedIn(true);
      } catch (error) {
        console.error('refreshToken이 없거나 만료', error);
      } finally {
        setIsAuthInitialized(true);
      }
    }
    initAuthStatus();
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    isAuthInitialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
