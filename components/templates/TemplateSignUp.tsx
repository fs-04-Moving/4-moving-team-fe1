'use client';

import { Role } from '@/types/entities/user.entity';
import FooterAuthPage from '../molecules/FooterAuthPage';
import HeaderAuthPage from '../molecules/HeaderAuthPage';
import FormSignUp from '../organisms/FormSignUp';

function TemplateSignUp({ role }: { role: Role }) {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[42px] mb-20">
      <div className="w-full flex flex-col justify-center">
        <HeaderAuthPage isSignUpPage={true} role={role} />
        <FormSignUp role={role} />
        <FooterAuthPage isSignUpPage={true} role={role} />
      </div>
    </div>
  );
}

export default TemplateSignUp;
