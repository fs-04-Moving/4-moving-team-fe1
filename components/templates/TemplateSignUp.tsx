import AuthPageFooter from '../molecules/AuthPageFooter';
import AuthPageHeader from '../molecules/AuthPageHeader';
import FormSignUp from '../organisms/FormSignUp';

function TemplateSignUp({ userType }: { userType: string }) {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[42px] mb-20">
      <div className="w-full flex flex-col justify-center">
        <AuthPageHeader isSignUpPage={true} userType={userType} />
        <FormSignUp />
        <AuthPageFooter isSignUpPage={true} userType={userType} />
      </div>
    </div>
  );
}

export default TemplateSignUp;
