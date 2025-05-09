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

/**
 * CSRF토큰을 포함한 state만들기 함수
 */
export function generateOAuthState(role: Role) {
  const csrfToken = crypto.randomUUID(); // 보안용
  const state = `${csrfToken}|${role}`;

  // 백엔드에서 토큰 검증을 하고 있으므로 아래 코드는 불필요
  // 프론트에서 검증을 할 경우 아래와 같은 2가지 방식 사용 가능

  // CSRF 토큰은 클라이언트 저장소(로컬스토리지 등)에 저장
  // localStorage.setItem('oauth_csrf_token', csrfToken);
  // 쿠키에 CSRF 토큰 탑재
  // document.cookie = `oauth_csrf_token=${csrfToken}; path=/; secure; samesite=strict`;

  return state;
}
