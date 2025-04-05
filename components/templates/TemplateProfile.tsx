import { Role } from '@/types/entities/user.entity';
import DividerHor from '../atoms/DividerHor';
import PageLabel from '../atoms/PageLabel';

interface Props {
  userType?: Role;
}

function TemplateProfile({ userType }: Props) {
  console.log(userType);
  return (
    <div className="flex flex-col w-[640px]">
      <PageLabel>프로필 등록 {userType}</PageLabel>
      <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
        추가 정보를 입력하여 회원가입을 완료해 주세요.
      </p>
      <DividerHor />
    </div>
  );
}

export default TemplateProfile;
