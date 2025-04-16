// components/molecules/GuestMenuStatic.tsx
'use client';

import icMenu from '@/assets/images/ic-menu.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ButtonSolid from '../atoms/ButtonSolid';

interface Props {
  onOpenMenu: () => void;
}

export default function GuestMenuStatic({ onOpenMenu }: Props) {
  const router = useRouter();

  return (
    <div className="flex justify-end w-[116px]">
      <div className="w-[116px] hidden lg:inline">
        <ButtonSolid onClick={() => router.push('/auth/log-in')} isGnb>
          로그인
        </ButtonSolid>
      </div>
      <Image
        src={icMenu}
        alt="메뉴 아이콘"
        className="w-6 h-6 ml-6 cursor-pointer lg:hidden"
        onClick={onOpenMenu}
      />
    </div>
  );
}
