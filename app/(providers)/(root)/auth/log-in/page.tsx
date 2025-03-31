'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateLogIn from '@/components/templates/TemplateLogIn';
import { Role } from '@/types/dtos/user.dto';
import { useSearchParams } from 'next/navigation';

function LogInPage() {
  const params = useSearchParams();
  const paramString = params.get('type');
  let userType: Role;
  if (!paramString) {
    userType = 'user';
  } else if (paramString === 'user') {
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
