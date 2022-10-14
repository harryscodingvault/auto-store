import React, { useEffect } from "react";
import { Wrapper } from "./LoginSuccess.style";

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <h5>Thanks for logging in!</h5>
    </Wrapper>
  );
};

export default LoginSuccess;
