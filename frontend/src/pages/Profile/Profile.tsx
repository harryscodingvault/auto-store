import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { deleteUser } from "../../redux/user/userSlice";

import { Wrapper } from "./Profile.style";

const Profile = () => {
  const { user } = useSelector((store: any) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  return (
    <Wrapper>
      {modal && (
        <Modal
          title={"Do you want to delete this profile?"}
          ModalOn={setModal}
          Action={() => dispatch(deleteUser())}
        />
      )}
      <div className="text-group">
        <h5 className="title">Username: </h5>
        <h5 className="info">{user.username || ""}</h5>
      </div>
      <div className="text-group">
        <h5 className="title">Email: </h5>
        <h5 className="info">{user.email || ""}</h5>
      </div>
      <div className="btn-group">
        <div className="btn" onClick={() => navigate("/account/edit")}>
          <h5>Edit</h5>
        </div>
        <div className="btn" onClick={() => setModal(true)}>
          <h5>Delete</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
