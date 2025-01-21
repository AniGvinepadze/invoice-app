import LoginHeader from "../../atoms/LoginHeader/LoginHeader";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";
import SignUpFormFields from "./SignUpFormField";

const SignUp = () => {
  return (
    <>
      <div>
        <LoginHeader />
      </div>
      <div className="flex justify-between p-3">
        <LogingIcon />
        <SignUpFormFields/>
      </div>
    </>
  );
};

export default SignUp;
