// 정렬 옵션 타입 정의
export type sortOption = '리뷰 많은순' | '평점 높은순' | '경력 높은순' | '확정 많은순';

// 정렬 옵션 상수
export const SORT_OPTIONS: sortOption[] = [
  '리뷰 많은순',
  '평점 높은순',
  '경력 높은순',
  '확정 많은순',
];

export const SORT_OPTIONS_LABELS = {
  mostReview: '리뷰 많은순',
  highestRated: '평점 높은순',
  mostExperience: '경력 높은순',
  mostConfirmed: '확정 많은순',
};

export type SortOptionKey = keyof typeof SORT_OPTIONS_LABELS;

// 기본 정렬 옵션
export const DEFAULT_SORT_OPTION: sortOption = '리뷰 많은순';

// worker page sort option 추가
export type sortOptionInWorkerPage = '이사 빠른순' | '요청일 빠른순';

export const SORT_OPTIONS_IN_WORKER_PAGE: sortOptionInWorkerPage[] = [
  '이사 빠른순',
  '요청일 빠른순',
];
// 기본 정렬 옵션
export const DEFAULT_SORT_OPTION_IN_WORKER_PAGE: sortOptionInWorkerPage = '이사 빠른순';
