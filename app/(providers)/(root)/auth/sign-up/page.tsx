'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateSignUp from '@/components/templates/TemplateSignUp';
import { Role } from '@/types/entities/user.entity';
import { useSearchParams } from 'next/navigation';

function SignUpPage() {
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
      <TemplateSignUp role={role} />
    </PageContainer>
  );
}

export default SignUpPage;
