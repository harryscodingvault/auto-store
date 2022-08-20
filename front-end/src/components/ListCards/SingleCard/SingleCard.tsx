import React from "react";
import { ProposalInterface, proposalType } from "../../../types/proposalType";

const SingleCard = ({ item }: { item: proposalType }) => {
  const {
    id,
    name,
    nVotesYay,
    nVotesNay,
    nVotesNeutral,
    capacity,
    passing_vote_req,
    passing_part_req,
    creator_id,
    passed,
  } = item;
  return <div>SingleCard</div>;
};

export default SingleCard;
