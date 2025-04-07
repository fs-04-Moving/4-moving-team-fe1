'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateLogIn from '@/components/templates/TemplateLogIn';
import { Role } from '@/types/entities/user.entity';
import { useSearchParams } from 'next/navigation';

function LogInPage() {
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
      <TemplateLogIn userType={userType} />
    </PageContainer>
  );
}

export default LogInPage;
