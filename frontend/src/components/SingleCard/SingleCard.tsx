import React from "react";
import { useNavigate } from "react-router-dom";
import { proposalInterface } from "../../types/proposalType";
import { format } from "date-fns";

import { Wrapper } from "./SingleCard.style";
import {
  deleteProposal,
  editProposal,
  setEditProposal,
} from "../../redux/proposal/proposalSlice";
import { useDispatch } from "react-redux";

const SingleCard = ({ item }: { item: any }) => {
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

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
        <div className="cap-stats">
          <p>{totalVotes}</p> / <p>{capacity}</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-group">
          <span>Deadline:</span>
          <h5>{format(new Date(deadline), "yyyy/MM/dd HH:mm bb") || null}</h5>
        </div>
        <div className="stat-group">
          <span>By:</span>
          <p>{createdBy.username}</p>
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
        <div
          className="btn"
          onClick={() => {
            dispatch(setEditProposal(item));
            navigate("/workshop/create");
          }}
        >
          <h5>Edit</h5>
        </div>
        <div
          className="btn"
          onClick={() => {
            dispatch(deleteProposal(_id));
          }}
        >
          <h5>Delete</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleCard;
