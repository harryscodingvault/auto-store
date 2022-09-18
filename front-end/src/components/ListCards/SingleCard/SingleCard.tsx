import React from "react";
import { useNavigate } from "react-router-dom";
import { ProposalInterface, proposalType } from "../../../types/proposalType";

import { Wrapper } from "./SingleCard.style";

const SingleCard = ({ item }: { item: proposalType }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    nVotesYay,
    nVotesNay,
    nVotesNeutral,
    capacity,
    passing_vote_req,
    creator_id,
    passed,
    active,
  } = item;
  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
      </div>
      <div className="creator">
        <span>by:</span>
        <p>{creator_id}</p>
      </div>
      <table className="data-group">
        <thead>
          <tr>
            <th>Cap: </th>
            <th>Req: </th>
            <th>Yes: </th>
            <th>No: </th>
            <th>Abs: </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{capacity}</td>
            <td>{passing_vote_req}</td>
            <td>{nVotesYay}</td>
            <td>{nVotesNay}</td>
            <td>{nVotesNeutral}</td>
          </tr>
        </tbody>
      </table>
      {active ? (
        <>
          <div className="button-group">
            <div className="btn">
              <h5>Yes</h5>
            </div>
            <div className="btn">
              <h5>No</h5>
            </div>
            <div className="btn">
              <h5>Neither</h5>
            </div>
          </div>
          <div className="edit-group">
            <div className="btn" onClick={() => navigate("/proposals/edit")}>
              <h5>Edit</h5>
            </div>
            <div className="btn">
              <h5>Delete</h5>
            </div>
          </div>
        </>
      ) : (
        <div className="result">
          {passed ? (
            <h5 className="positive">Passed</h5>
          ) : (
            <h5 className="negative">Not Passed</h5>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default SingleCard;
