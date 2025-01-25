import React from "react";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";
import LoginFormFields from "./LoginFormFields";
import LoginHeader from "../../atoms/LoginHeader/LoginHeader";

const Login = () => {
  return (
    <>
    <div className="max-[900px] w-full">
        <LoginHeader/>
      </div>
        <div className="max-w-[1440px] w-full flex p-3 gap-10">
      <LogingIcon />
      <LoginFormFields />
    </div>
    </>
  );
};

export default Login;
