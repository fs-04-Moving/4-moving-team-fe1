import icProfile from '@/assets/images/ic-profile.svg';
import Image from 'next/image';

interface Props {
  onClick: () => void;
  profileImage?: string;
  name: string;
}

function UserProfile({ onClick, profileImage, name }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:opacity-60 active:opacity-40"
    >
      <div className="flex items-center relative w-6 h-6 lg:w-9 lg:h-9 ml-6 lg:ml-8">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필 이미지"
            fill
            className="rounded-full"
          />
        ) : (
          <Image
            src={icProfile}
            alt="빈 프로필"
            className="w-6 h-6 lg:w-9 lg:h-9"
          />
        )}
      </div>

      <p className="hidden ml-4 lg:block text-lg font-medium text-Black-400">
        {name}
      </p>
    </div>
  );
}

export default UserProfile;
