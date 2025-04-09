// 정렬 옵션 타입 정의
export type sortOption =
  | '리뷰 많은순'
  | '평점 높은순'
  | '경력 높은순'
  | '확정 많은순';

// 정렬 옵션 상수
export const SORT_OPTIONS: sortOption[] = [
  '리뷰 많은순',
  '평점 높은순',
  '경력 높은순',
  '확정 많은순',
];

// 기본 정렬 옵션
export const DEFAULT_SORT_OPTION: sortOption = '리뷰 많은순';
