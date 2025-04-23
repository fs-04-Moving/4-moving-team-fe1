// 실행 백엔드 URL - 배포된 주소
// - 서버 실행 시 이 경로를 사용해야 함
export const API_URL = process.env.API_URL ?? 'http://localhost:5050';

// axios baseURL로 사용
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
