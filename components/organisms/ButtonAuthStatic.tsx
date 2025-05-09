// components/atoms/ButtonAuthStatic.tsx
'use client';

interface Props {
  onOpenMenu: () => void;
}

export default function ButtonAuthStatic({ onOpenMenu }: Props) {
  return (
    <button onClick={onOpenMenu} className="lg:hidden px-4 py-2 text-sm border rounded-md">
      메뉴
    </button>
  );
}
