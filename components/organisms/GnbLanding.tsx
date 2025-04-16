// components/organisms/GnbLanding.tsx
import LogoIconText from '../atoms/LogoIconText';
import GuestMenuStatic from '../molecules/GuestMenuStatic';
import NavMenuLanding from '../molecules/NavMenuLanding';

interface Props {
  onOpenMenu: () => void;
}

export default function GnbLanding({ onOpenMenu }: Props) {
  return (
    <header className="flex flex-col items-center justify-center sticky z-20 top-0 backdrop-blur-3xl border-b border-GrayScale-100">
      <div className="flex justify-between items-center w-[327px] md:w-[600px] lg:w-[1400px] h-16 lg:h-22 px-4 lg:px-0">
        <LogoIconText className="w-[88px] lg:w-[116px]" />
        <NavMenuLanding />
        <div className="shrink-0">
          <GuestMenuStatic onOpenMenu={onOpenMenu} />
        </div>
      </div>
    </header>
  );
}
