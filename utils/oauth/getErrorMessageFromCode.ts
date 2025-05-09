import { Role } from '@/types/entities/user.entity';
import { attachJosa } from '../attachJosa';
import { getProviderText, getRoleText, Provider } from './oauthUserHelpers';

interface ErrorData {
  [key: string]: string | undefined;
}

/**
 * 소셜 또는 로컬 로그인/회원가입 실패 시 백엔드에서 전달된
 * errorCode와 관련 메타데이터(provider, role 등)를 바탕으로
 * 사용자에게 보여줄 에러 메시지를 생성하는 범용 유틸 함수
 *
 * 백엔드에서는 에러 상황에 따라 errorCode와 함께 관련 데이터를 응답하며,
 * 이 함수를 통해 상황에 맞는 한국어 메시지를 구성할 수 있다.
 */
export function getErrorMessageFromCode(errorCode: string | null, data: ErrorData = {}): string {
  switch (errorCode) {
    // provider 불일치
    case 'PROVIDER_MISMATCH': {
      const provider = getProviderText(data.existingProvider as Provider);
      const role = getRoleText(data.role as Role);
      return (
        `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
        `${attachJosa(`${role}`, '으로')} 가입된 이메일입니다.\n` +
        `${attachJosa(`${provider}`, '으로')} 로그인해 주세요.`
      );
    }

    // role 불일치
    case 'ROLE_MISMATCH': {
      const provider = getProviderText(data.provider as Provider);
      const existingRole = getRoleText(data.existingRole as Role);
      const requestedRole = getRoleText(data.requestedRole as Role);
      return (
        `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
        `${attachJosa(`${existingRole}`, '으로')} 가입된 이메일입니다.\n` +
        `${existingRole} 로그인 페이지에서 로그인하시거나\n` +
        `다른 계정을 통해 ${attachJosa(`${requestedRole}`, '으로')} 가입하세요.`
      );
    }

    // 회원가입 처리 실패
    case 'USER_CREATION_FAILED':
      return '회원가입 중 문제가 발생했습니다.\n다시 시도해주세요.';

    // 정의되지 않은 에러 코드
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
}

// import { Role } from '@/types/entities/user.entity';
// import { attachJosa } from '../attachJosa';
// import { getProviderText, getRoleText, Provider } from './oauthUserHelpers';

// /**
//  * 소셜 로그인 시 백엔드에서 전달된 errorCode, provider, role이용해 에러 메시지를 생성
//  */
// export function getErrorMessageFromQuery(
//   searchParams: URLSearchParams
// ): string {
//   const errorCode = searchParams.get('errorCode');

//   // provider 불일치
//   switch (errorCode) {
//     case 'PROVIDER_MISMATCH': {
//       const provider = getProviderText(
//         searchParams.get('existingProvider') as Provider
//       );
//       const role = getRoleText(searchParams.get('role') as Role);
//       return (
//         `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
//         `${attachJosa(`${role}`, '으로')} 가입된 이메일입니다.\n` +
//         `${attachJosa(`${provider}`, '으로')} 로그인해 주세요.`
//       );
//     }

//     // role 불일치
//     case 'ROLE_MISMATCH': {
//       const provider = getProviderText(
//         searchParams.get('provider') as Provider
//       );
//       const existingRole = getRoleText(
//         searchParams.get('existingRole') as Role
//       );
//       const requestedRole = getRoleText(
//         searchParams.get('requestedRole') as Role
//       );
//       return (
//         `이미 ${attachJosa(`${provider}`, '을를')} 이용해 ` +
//         `${attachJosa(`${existingRole}`, '으로')} 가입된 이메일입니다.\n` +
//         `${existingRole} 로그인 페이지에서 로그인하시거나\n` +
//         `다른 계정을 통해 ${attachJosa(`${requestedRole}`, '으로')} 가입하세요.`
//       );
//     }

//     // 회원가입 실패
//     case 'USER_CREATION_FAILED':
//       return '회원가입 중 문제가 발생했습니다.\n다시 시도해주세요.';

//     default:
//       return '알 수 없는 오류가 발생했습니다.';
//   }
// }
