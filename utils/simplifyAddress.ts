export const simplifyAddress = (address: string) => {
  const parts = address.split(' ');
  if (parts.length < 2) return address; // 예외 처리

  const first = parts[0].slice(0, 2);
  const rest = parts.slice(1).join(' ');
  return `${first} ${rest}`;
};
