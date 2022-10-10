import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SingleCard from "../../components/SingleCard/SingleCard";
import Modal from "../../components/Modal/Modal";
import SortingBar from "../../components/SortingBar/SortingBar";
import { getAllProposals } from "../../redux/allProposals/allProposalsSlice";
import { Wrapper } from "./PrivateProposals.style";
import PageRequestBar from "../../components/PageRequestBar/PageRequestBar";

const PrivateProposals = () => {
  const {
    isLoading,
    proposals,
    errorMessage,
    numOfPages,
    page,
    totalProposals,
  } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();

  console.log(page);

  useEffect(() => {
    dispatch(getAllProposals());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (proposals?.length === 0) {
    return <div>No proposals to display</div>;
  }

  return (
    <Wrapper>
      <SortingBar />

      <div className="list">
        {proposals?.map((item: any) => (
          <SingleCard item={item} key={item._id} />
        ))}
      </div>
      <PageRequestBar />
    </Wrapper>
  );
};

export default PrivateProposals;
