'use client';

import authApi from '@/api/auth/auth.api';
import { client } from '@/api/client';
import { Role } from '@/types/entities/user.entity';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface User {
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
  role?: Role;
  hasProfile?: boolean;
}

const AuthContext = createContext<AuthContextValue>({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(['me']);

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
    // setIsAuthInitialized(false);
  };

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
  }, []);

  const value = {
    isLoggedIn,
    isAuthInitialized,
    logIn,
    logOut,
    role: user?.role,
    hasProfile: user?.hasProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
