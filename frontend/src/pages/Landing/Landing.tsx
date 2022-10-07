import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./Landing.style";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ul>
        <li>
          <p>1) Sign In</p>
        </li>
        <li>
          <p>2) Create a proposal</p>
        </li>
        <li>
          <p>3) Vote and share</p>
        </li>
      </ul>
      <div className="btn-group">
        <div className="btn" onClick={() => navigate("registration")}>
          <h5>Login/Register</h5>
        </div>
        <div
          className="btn google-btn"
          onClick={() => navigate("home/proposals/current")}
        >
          <h5>Google SignIn</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
