import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./Error.style";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h5>Wrong Way!!!</h5>
      <div className="btn" onClick={() => navigate(-1)}>
        <h5>Go back</h5>
      </div>
    </Wrapper>
  );
};

export default Error;
