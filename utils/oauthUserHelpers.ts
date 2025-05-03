import { Role } from '@/types/entities/user.entity';

export type Provider = 'local' | 'google' | 'kakao' | 'naver';

/**
 * ROLE enum -> 한글
 */
export function getRoleText(role: Role): string {
  return role === 'customer' ? '고객' : '기사';
}

/**
 * provider명을 한글로 변경
 */
export function getProviderText(provider: Provider): string {
  switch (provider) {
    case 'google':
      return '구글';
    case 'kakao':
      return '카카오';
    case 'naver':
      return '네이버';
    case 'local':
      return '이메일/패스워드';
  }
}
