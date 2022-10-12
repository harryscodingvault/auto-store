import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SingleCard from "../../components/SingleCard/SingleCard";
import {
  getProposal,
  setSharedProposalId,
} from "../../redux/proposal/proposalSlice";

import { Wrapper } from "./Shared.style";

const Shared = () => {
  const { user } = useSelector((store: any) => store.user);
  const { sharedProposal } = useSelector((store: any) => store.proposal);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedProposal.id) {
      dispatch(setSharedProposalId(id));
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getProposal(id));
  }, [dispatch]);

  return (
    <Wrapper>
      {Object.keys(sharedProposal?.data).length !== 0 && (
        <SingleCard item={sharedProposal.data} />
      )}
    </Wrapper>
  );
};

export default Shared;
