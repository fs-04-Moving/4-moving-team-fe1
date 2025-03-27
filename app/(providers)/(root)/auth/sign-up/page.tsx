'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateSignUp from '@/components/templates/TemplateSignUp';
import { useSearchParams } from 'next/navigation';

function SignUpPage() {
  const params = useSearchParams();
  const userType = params.get('type') || 'user';

  return (
    <PageContainer>
      <TemplateSignUp userType={userType} />
    </PageContainer>
  );
}

export default SignUpPage;
