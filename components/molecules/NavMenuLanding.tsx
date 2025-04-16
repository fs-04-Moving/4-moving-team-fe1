// components/molecules/NavMenuLanding.tsx
import Link from 'next/link';

export default function NavMenuLanding() {
  return (
    <nav className="w-full pl-20 gap-10 hidden lg:flex">
      <Link
        href="/find-worker"
        className="text-lg font-bold text-Black-400 hover:opacity-40 active:opacity-20"
      >
        기사님 찾기
      </Link>
    </nav>
  );
}
