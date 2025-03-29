import AuthPageFooter from '../molecules/AuthPageFooter';
import AuthPageHeader from '../molecules/AuthPageHeader';
import FormLogIn from '../organisms/FormLogIn';

function TemplateLogIn({ userType }: { userType: string }) {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[42px] mb-20">
      <div className="w-full flex flex-col justify-center">
        <AuthPageHeader isSignUpPage={false} userType={userType} />
        <FormLogIn />
        <AuthPageFooter isSignUpPage={false} userType={userType} />
      </div>
    </div>
  );
}

export default TemplateLogIn;
