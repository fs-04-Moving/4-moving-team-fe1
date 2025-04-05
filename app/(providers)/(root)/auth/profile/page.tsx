'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateProfile from '@/components/templates/TemplateProfile';
import { Role } from '@/types/entities/user.entity';
import { useSearchParams } from 'next/navigation';

function ProfilePage() {
  const params = useSearchParams();
  const paramString = params.get('userType');
  let userType: Role;
  if (!paramString) {
    userType = 'customer';
  } else if (paramString === 'customer') {
    userType = paramString;
  } else {
    userType = 'worker';
  }

  return (
    <PageContainer>
      <TemplateProfile userType={userType} />
    </PageContainer>
  );
}

export default ProfilePage;
