/**
 * 전화번호 저장용 유틸
 */
// 표시용 포매터 - 하이픈 포함
export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

// 실제 저장용 (숫자만)
export const extractDigits = (value: string) => value.replace(/\D/g, '');
