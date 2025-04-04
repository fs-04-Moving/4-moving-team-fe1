import { AreaType } from '@/types/move.type';

// 지역 상수 객체
export const AREA_CONSTANTS: AreaType = {
  seoul: '서울',
  gyeonggi: '경기',
  incheon: '인천',
  gangwon: '강원',
  chungbuk: '충북',
  chungnam: '충남',
  sejong: '세종',
  daejeon: '대전',
  jeonbuk: '전북',
  jeonnam: '전남',
  gwangju: '광주',
  gyeongbuk: '경북',
  gyeongnam: '경남',
  daegu: '대구',
  ulsan: '울산',
  busan: '부산',
  jeju: '제주',
};

// 지역 키 목록
export const AREA_KEYS = Object.keys(AREA_CONSTANTS) as Array<keyof AreaType>;

// 지역 행 구성 (UI 배치용)
export const AREA_ROWS = [
  AREA_KEYS.slice(0, 5),
  AREA_KEYS.slice(5, 10),
  AREA_KEYS.slice(10, 15),
  AREA_KEYS.slice(15),
];
