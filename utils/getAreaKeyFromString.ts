import { AREA_DATA } from '@/types/move.type';

type AreaKey = keyof typeof AREA_DATA;

/**
 * 주소 문자열을 받아 영문 AreaType을 반환하는 함수입니다.
 * @param addressStr
 * @returns
 */
export function getAreaKeyFromString(addressStr: string): AreaKey | undefined {
  const prefix = addressStr.slice(0, 2); // 앞 두 글자 추출

  const entry = Object.entries(AREA_DATA).find(([, value]) =>
    value.startsWith(prefix)
  );

  if (entry) {
    return entry[0] as AreaKey;
  }

  return undefined;
}
