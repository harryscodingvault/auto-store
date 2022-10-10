import React from "react";
import { useNavigate } from "react-router-dom";
import { proposalInterface } from "../../types/proposalType";
import { format } from "date-fns";

import { Wrapper } from "./SingleCard.style";

const SingleCard = ({ item }: { item: any }) => {
  console.log(item);
  const navigate = useNavigate();
  const {
    _id,
    title,
    options,
    capacity,
    chosenProposal,
    active,
    deadline,
    editOn,
    totalVotes,
    createdBy,
  } = item;

  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
      </div>

      <div className="stats">
        <div className="stat-group">
          <span>By:</span>
          <p>{createdBy.username}</p>
        </div>
        <div className="stat-group">
          <span>Capacity:</span>
          <p>{capacity}</p>
        </div>

        <div className="stat-group">
          <span>Votes:</span>
          <p>{totalVotes}</p>
        </div>

        <div className="stat-group">
          <span>Deadline:</span>
          <p>{format(new Date(deadline), "yyyy-MM-dd/HH:mm bbb") || null}</p>
        </div>
      </div>
      <ul className="list-options">
        {options.map((item: any) => (
          <li
            className={`option-item ${item.selected && "selected"}`}
            key={item._id}
          >
            <p>{item.count || 0}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      {!active && (
        <div className="result">
          <h5>Passed:</h5>
          {chosenProposal.map((item: string) => (
            <h5>{item}</h5>
          ))}
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
