import React, { useState, useEffect } from "react";
import Login from "../../components/Registration/Login/Login";
import Register from "../../components/Registration/Register/Register";
import { store } from "../../redux/store";
import { Wrapper } from "./Registration.Style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [login, setLogin] = useState(true);
  const { user } = useSelector((store: any) => store.user);
  const { sharedProposal } = useSelector((store: any) => store.proposal);
  const navigate = useNavigate();

  useEffect(() => {
    if (sharedProposal.id && user) {
      navigate(`/shared/${sharedProposal.id}`);
    } else if (user) {
      navigate("/home");
    }
  }, [user, navigate, sharedProposal]);

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
