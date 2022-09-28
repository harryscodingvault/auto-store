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

      <div className="creator">
        <span>by:</span>
        <p>{creator_id}</p>
      </div>
      <ul className="list-options">
        {options.map((item) => (
          <li className="option-item">{item.name}</li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SingleCard;
