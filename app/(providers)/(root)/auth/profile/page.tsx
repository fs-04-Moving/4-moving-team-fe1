import DividerHor from '@/components/atoms/DividerHor';
import PageLabel from '@/components/atoms/PageLabel';
import PageContainer from '@/components/templates/PageContainer';

function ProfilePage() {
  return (
    <PageContainer>
      <div className="flex flex-col w-[640px]">
        <PageLabel>프로필 등록</PageLabel>
        <p className="text-xs lg:text-xl text-Black-200 my-4 lg:my-8">
          추가 정보를 입력하여 회원가입을 완료해 주세요.
        </p>
        <DividerHor />
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
