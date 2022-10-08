import React, { useState, useEffect } from "react";
import { Wrapper } from "./LogoutPage.style";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h5>Ready to leave?</h5>
      <div className="btn-group">
        <div className="btn">
          <h5>Yes</h5>
        </div>
        <div className="btn" onClick={() => navigate(-1)}>
          <h5>No</h5>
        </div>
      </div>
    </Wrapper>
  );
};
export default LogoutPage;
