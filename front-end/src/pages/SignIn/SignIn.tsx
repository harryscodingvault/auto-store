import React, { useState } from "react";
import { Wrapper } from "./SignIn.style";

import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const SignIn = () => {
  const [login, setLogin] = useState(true);

  return (
    <Wrapper>
      {login ? (
        <>
          <Login />
          <div className="btn btn-switch" onClick={() => setLogin(false)}>
            <h5>Want to register?</h5>
          </div>
        </>
      ) : (
        <>
          <Register />
          <div className="btn btn-switch" onClick={() => setLogin(true)}>
            <h5>Want to login?</h5>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SignIn;
