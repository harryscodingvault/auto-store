import React, { useState, useEffect } from "react";
import { Wrapper } from "./LogoutPage.style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/userSlice";

const LogoutPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <h5>Ready to leave?</h5>
      <div className="btn-group">
        <div className="btn" onClick={() => dispatch(logoutUser())}>
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
