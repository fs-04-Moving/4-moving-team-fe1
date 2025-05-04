// src/utils/getErrorMessageFromQuery.ts

import { Role } from '@/types/entities/user.entity';
import { attachJosa } from '../attachJosa';
import { getProviderText, getRoleText, Provider } from './oauthUserHelpers';

/**
 * 소셜 로그인 시 백엔드에서 전달된 errorCode, provider, role이용해 에러 메시지를 생성
 */
export function getErrorMessageFromQuery(
  searchParams: URLSearchParams
): string {
  const errorCode = searchParams.get('errorCode');

  // provider 불일치
  switch (errorCode) {
    case 'PROVIDER_MISMATCH': {
      const provider = getProviderText(
        searchParams.get('existingProvider') as Provider
      );
      const role = getRoleText(searchParams.get('role') as Role);
      return (
        `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
        `${attachJosa(`${role}`, '으로')} 가입된 이메일입니다.\n` +
        `${attachJosa(`${provider}`, '으로')} 로그인해 주세요.`
      );
    }

    // role 불일치
    case 'ROLE_MISMATCH': {
      const provider = getProviderText(
        searchParams.get('provider') as Provider
      );
      const existingRole = getRoleText(
        searchParams.get('existingRole') as Role
      );
      const requestedRole = getRoleText(
        searchParams.get('requestedRole') as Role
      );
      return (
        `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
        `${attachJosa(`${existingRole}`, '으로')} 가입된 이메일입니다.\n` +
        `${existingRole} 로그인 페이지에서 로그인하시거나\n` +
        `다른 계정을 통해 ${attachJosa(`${requestedRole}`, '으로')} 가입하세요.`
      );
    }

    // 회원가입 실패
    case 'USER_CREATION_FAILED':
      return '회원가입 중 문제가 발생했습니다.\n다시 시도해주세요.';

    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
}
