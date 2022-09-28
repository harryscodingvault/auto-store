import React from "react";
import { useNavigate } from "react-router-dom";
import { proposalInterface } from "../../../types/proposalType";

import { Wrapper } from "./SingleCard.style";

const SingleCard = ({ item }: { item: proposalInterface }) => {
  const navigate = useNavigate();
  const { id, title, options, timeLeft, max, creator_id, active } = item;

  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
      </div>
      <div className="edit-group">
        <div className="btn" onClick={() => navigate("/proposals/edit")}>
          <h5>Edit</h5>
        </div>
        <div className="btn">
          <h5>Delete</h5>
        </div>
      </div>
      <div className="creator">
        <span>by:</span>
        <p>{creator_id}</p>
      </div>
    </Wrapper>
  );
};

export default SingleCard;
