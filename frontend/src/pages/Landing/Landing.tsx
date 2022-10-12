import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/user/userSlice";
import { Wrapper } from "./Landing.style";

const Landing = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store: any) => store.user);
  const { sharedProposal } = useSelector((store: any) => store.proposal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sharedProposal.id && user) {
      navigate(`shared/${sharedProposal.id}`);
    } else if (user) {
      navigate("home");
    }
  });

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

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div
            className="btn"
            onClick={() =>
              dispatch(
                loginUser({
                  email: "testuser@testazvoter.com",
                  password: "testpasswordtestazvoter",
                })
              )
            }
          >
            <h5>Test App/Demo</h5>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Landing;
