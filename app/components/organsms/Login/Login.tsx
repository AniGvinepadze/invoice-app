import React from "react";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";
import LoginFormFields from "./LoginFormFields";
import LoginHeader from "../../atoms/LoginHeader/LoginHeader";

const Login = () => {
  return (
    <>
      <div>
        <LoginHeader />
      </div>
      <div className="flex h-screen  gap-4 items-center justify-center">
        <LogingIcon />
        <LoginFormFields />
      </div>
    </>
  );
};

export default Login;
