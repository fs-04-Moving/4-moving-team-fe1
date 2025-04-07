'use client';

import { client } from '@/api/client';
import usersApi from '@/api/users/users.api';
import { Role } from '@/types/entities/user.entity';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  name: string;
  profileImage?: string;
  hasProfile: boolean;
  role: Role;
}
interface AuthContextValue {
  isLoggedIn?: boolean;
  isAuthInitialized?: boolean;
  logIn?: () => void;
  logOut?: () => void;
  authUser?: User;
}

const AuthContext = createContext<AuthContextValue>({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [authUser, setAuthUser] = useState<User>();
  const pathName = usePathname();
  const router = useRouter();

  const logIn = () => {
    setIsLoggedIn(true);
    setIsAuthInitialized(true);
  };
  const logOut = () => {
    // client 요청 header에서 토큰 제거
    client.defaults.headers['Authorization'] = '';

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setIsAuthInitialized(false);
    setAuthUser(undefined);
  };

  // 로그인된 상태에서
  // 프로필을 작성하지 않은 경우 프로필 페이지로 이동
  // 로그인 또는 회원가입 페이지, 랜딩 페이지에 접근하면 각 유저의 기본 화면으로 이동
  // 고객: 견적 요청, 기사: 받은 요청 목록
  useEffect(() => {
    if (!authUser || !isLoggedIn) return;
    if (!authUser.hasProfile) {
      router.replace(`/${authUser.role}/profile`);
    } else {
      if (
        isLoggedIn &&
        authUser.role &&
        (pathName === '/auth/sign-up' ||
          pathName === '/auth/log-in' ||
          pathName === '/' ||
          pathName === `/${authUser.role}/profile`)
      ) {
        router.replace(`/${authUser.role}`);
      }
    }
  }, [isLoggedIn, pathName, router, authUser]);

  // 로그아웃된 상태에서 로그인/회원가입 외의 페이지에 있을 경우 랜딩 페이지로 이동
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
        // user 세팅
        const user = await usersApi.getUserMe();
        if (user) {
          setAuthUser(user);
          setIsLoggedIn(true);
        }
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
    logIn,
    logOut,
    authUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
