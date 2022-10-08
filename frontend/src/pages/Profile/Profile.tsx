import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/user/userSlice";

import { Wrapper } from "./Profile.style";

const Profile = () => {
  const { user } = useSelector((store: any) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="text-group">
        <h5 className="title">Username: </h5>
        <h5 className="info">{user.payload.username}</h5>
      </div>
      <div className="text-group">
        <h5 className="title">Email: </h5>
        <h5 className="info">{user.payload.email}</h5>
      </div>
      <div className="btn-group">
        <div className="btn" onClick={() => navigate("/account/edit")}>
          <h5>Edit</h5>
        </div>
        <div className="btn">
          <h5>Delete</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
