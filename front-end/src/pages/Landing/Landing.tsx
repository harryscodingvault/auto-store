import React from "react";
import { Wrapper } from "./Landing.style";
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h2>EzVoting</h2>
      <ul>
        <li>
          <span>_</span>Create a proposal
        </li>
        <li>
          <span>_</span>Add passing percentage
        </li>
        <li>
          <span>_</span>Share it and vote!
        </li>
      </ul>
      <div className="btn" onClick={() => navigate("login")}>
        <h5>Login/Register</h5>
      </div>
      <div className="btn">
        <h5>
          <BsGoogle />
          Google SignIn
        </h5>
      </div>
    </Wrapper>
  );
};

export default Landing;
