'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateLogIn from '@/components/templates/TemplateLogIn';
import { Role } from '@/types/entities/user.entity';
import { useSearchParams } from 'next/navigation';

function LogInPage() {
  const params = useSearchParams();
  const paramString = params.get('role');
  let role: Role;
  if (!paramString) {
    role = 'customer';
  } else if (paramString === 'customer') {
    role = paramString;
  } else {
    role = 'worker';
  }

  return (
    <PageContainer>
      <TemplateLogIn role={role} />
    </PageContainer>
  );
}

export default LogInPage;
