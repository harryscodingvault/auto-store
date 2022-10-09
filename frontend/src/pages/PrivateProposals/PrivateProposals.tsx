import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cards } from "../../cardList";

import SingleCard from "../../components/ListCards/SingleCard/SingleCard";
import Modal from "../../components/Modal/Modal";
import SortingBar from "../../components/SortingBar/SortingBar";
import { getAllProposals } from "../../redux/allProposals/allProposalsSlice";
import { Wrapper } from "./PrivateProposals.style";

const PrivateProposals = () => {
  const { isLoading, proposals, errorMessage } = useSelector(
    (store: any) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProposals());
  }, [dispatch]);

  const filteredCards = cards.filter((item) => item.active === true);

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
        {filteredCards.map((item) => (
          <SingleCard item={item} key={item.id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default PrivateProposals;
