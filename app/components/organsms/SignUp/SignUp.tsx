import LoginHeader from "../../atoms/LoginHeader/LoginHeader";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";
import SignUpFormFields from "./SignUpFormField";

const SignUp = () => {
  return (
    <>
      <div>
        <LoginHeader />
      </div>
      <div className="flex h-screen p-3  gap-4 items-center justify-center">
        <LogingIcon />
        <SignUpFormFields />
      </div>
    </>
  );
};

export default SignUp;
