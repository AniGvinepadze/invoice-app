import React from "react";
import LogingIcon from "../../atoms/LoginIcon/LoginIcon.";

import LoginHeader from "../../atoms/LoginHeader/LoginHeader";
import VerifyForm from "./VerifyForm";

const Verify = () => {
  return (
    <>
      <div>
        <LoginHeader />
      </div>
      <div className="flex h-screen p-3 gap-4 items-center justify-center">
        <LogingIcon />
        <VerifyForm/>

      </div>
    </>
  );
};

export default Verify;
