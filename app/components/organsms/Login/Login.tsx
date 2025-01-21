import React from "react";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";
import LoginFormFields from "./LoginFormFields";
import LoginHeader from "../../atoms/LoginHeader/LoginHeader";

const Login = () => {
  return (
    <>
    <div>
        <LoginHeader/>
      </div>
        <div className="flex justify-between p-3">
      <LogingIcon />
      <LoginFormFields />
    </div>
    </>
  );
};

export default Login;
