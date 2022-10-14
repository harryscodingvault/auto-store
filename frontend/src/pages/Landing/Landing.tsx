import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/user/userSlice";
import { Wrapper } from "./Landing.style";

const Landing = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store: any) => store.user);
  const { sharedProposal } = useSelector((store: any) => store.proposal);
  const dispatch = useDispatch();
  const [thisUser, setThisUser] = useState(null);
  console.log(thisUser);

  useEffect(() => {
    if (sharedProposal.id && user) {
      navigate(`shared/${sharedProposal.id}`);
    } else if (user) {
      navigate("home");
    }
  }, []);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        //@ts-ignore
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication failed");
        })
        .then((resObj) => {
          setThisUser(resObj.user);
        })
        .catch((err) => console.log(err));
    };
    getUser();
  }, []);

  const openGoogleAuth = async () => {
    const googleLoginURL = `http://localhost:5000/api/auth/login/google`;
    window.open(googleLoginURL, "_self");
  };

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
        <div className="btn google-btn" onClick={() => openGoogleAuth()}>
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
