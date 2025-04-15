import { navMenuItems } from '@/constants/navMenuItems';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NavMenuItem from '../atoms/NavMenuItem';

function NavMenuGnb() {
  const router = useRouter();
  const { role, hasProfile, isLoggedIn } = useAuth();

  return (
    <div className="w-full pl-20 gap-10 hidden lg:flex">
      {navMenuItems
        .filter(
          (item) =>
            item.showIn?.includes('gnb') &&
            item.condition(
              role ?? null,
              hasProfile ?? false,
              isLoggedIn ?? false
            )
        )
        .map((item, index) => (
          <NavMenuItem
            key={index}
            onClick={() => item.onClick(router, role ?? null)}
          >
            {item.label}
          </NavMenuItem>
        ))}
    </div>
  );
}

export default NavMenuGnb;
