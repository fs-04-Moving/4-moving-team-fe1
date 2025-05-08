'use client';

import { Role } from '@/types/entities/user.entity';
import FooterAuthPage from '../molecules/FooterAuthPage';
import HeaderAuthPage from '../molecules/HeaderAuthPage';
import FormLogIn from '../organisms/FormLogIn';

function TemplateLogIn({ role }: { role: Role }) {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[42px] mb-20">
      <div className="w-full flex flex-col justify-center">
        <HeaderAuthPage isSignUpPage={false} role={role} />
        <FormLogIn role={role} />
        <FooterAuthPage isSignUpPage={false} role={role} />
      </div>
    </div>
  );
}

export default TemplateLogIn;
