'use client';

import PageContainer from '@/components/templates/PageContainer';
import TemplateLogIn from '@/components/templates/TemplateLogIn';
import { useSearchParams } from 'next/navigation';

function LogInPage() {
  const params = useSearchParams();
  const userType = params.get('type') || 'user';

  return (
    <PageContainer>
      <TemplateLogIn userType={userType} />
    </PageContainer>
  );
}

export default LogInPage;
