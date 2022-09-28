import React from "react";
import { useNavigate } from "react-router-dom";
import { proposalInterface } from "../../../types/proposalType";

import { Wrapper } from "./SingleCard.style";

const SingleCard = ({ item }: { item: proposalInterface }) => {
  const navigate = useNavigate();
  const { id, title, options, timeLeft, max, creator_id, active, winner } =
    item;

  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
      </div>

      <div className="creator">
        <span>by:</span>
        <p>{creator_id}</p>
      </div>
      <ul className="list-options">
        {options.map((item) => (
          <li
            className={`option-item ${item.selected && "selected"}`}
            key={item.id}
          >
            <p>{item.votes}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      {!active && (
        <div className="result">
          <h5>Passed:</h5>
          <h5>{winner}</h5>
        </div>
      )}
      <div className="edit-group">
        <div className="btn">
          <h5>Edit</h5>
        </div>
        <div className="btn">
          <h5>Delete</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleCard;
