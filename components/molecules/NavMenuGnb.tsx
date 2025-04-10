import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NavMenuItem from '../atoms/NavMenuItem';

function NavMenuGnb() {
  const router = useRouter();
  const handleClickFindWorker = () => {
    router.push('/customer/favorites');
    console.log('slkdfj');
  };

  const { role, hasProfile } = useAuth();

  return (
    <div className="w-full px-20 gap-10 hidden lg:flex">
      {hasProfile && role === 'customer' && (
        <NavMenuItem>견적 요청</NavMenuItem>
      )}
      {hasProfile && role === 'worker' && <NavMenuItem>받은 요청</NavMenuItem>}
      {role !== 'worker' && (
        <NavMenuItem onClick={handleClickFindWorker}>기사님 찾기</NavMenuItem>
      )}
      {hasProfile && <NavMenuItem>내 견적 관리</NavMenuItem>}
    </div>
  );
}

export default NavMenuGnb;
