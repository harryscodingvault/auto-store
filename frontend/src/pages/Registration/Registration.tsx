import React, { useState } from "react";
import Login from "../../components/Registration/Login/Login";
import Register from "../../components/Registration/Register/Register";
import { Wrapper } from "./Registration.Style";

const Registration = () => {
  const [login, setLogin] = useState(true);

  return (
    <Wrapper>
      {login ? (
        <>
          <Login />
          <div className="link-text" onClick={() => setLogin(false)}>
            Create an account?
          </div>
        </>
      ) : (
        <>
          <Register />
          <div className="link-text" onClick={() => setLogin(true)}>
            Got an account?
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Registration;
