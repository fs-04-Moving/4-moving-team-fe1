'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateSignUp from '@/components/templates/TemplateSignUp';
import { Role } from '@/types/entities/user.entity';
import { useSearchParams } from 'next/navigation';

function SignUpPage() {
  const params = useSearchParams();
  const paramString = params.get('type');
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
      <TemplateSignUp userType={userType} />
    </PageContainer>
  );
}

export default SignUpPage;
