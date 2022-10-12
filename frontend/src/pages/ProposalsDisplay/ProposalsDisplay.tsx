import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SingleCard from "../../components/SingleCard/SingleCard";
import Modal from "../../components/Modal/Modal";
import SortingBar from "../../components/SortingBar/SortingBar";
import {
  getAllProposals,
  updateUrl,
} from "../../redux/allProposals/allProposalsSlice";
import { Wrapper } from "./ProposalsDisplay.style";
import PageRequestBar from "../../components/PageRequestBar/PageRequestBar";
import SearchBar from "../../components/SearchBar/SearchBar";

const ProposalsDisplay = ({ urlType }: { urlType: string }) => {
  const {
    isLoading,
    proposals,
    errorMessage,
    numOfPages,
    page,
    totalProposals,
    sort,
    search,
    currentURL,
  } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentURL !== urlType) {
      dispatch(updateUrl(urlType));
    }
    dispatch(getAllProposals(urlType));
  }, [dispatch, urlType, page, sort, currentURL, search]);

  return (
    <Wrapper>
      <SearchBar />
      <SortingBar />

      {isLoading && <div className="spinner"></div>}

      {proposals?.length === 0 && !isLoading && (
        <h5 className="not-found">No proposals found</h5>
      )}
      {proposals?.length >= 1 && !isLoading && (
        <div className="list">
          {proposals?.map((item: any) => (
            <SingleCard item={item} key={item._id} />
          ))}
        </div>
      )}
      {proposals?.length >= 2 && !isLoading && <PageRequestBar />}
    </Wrapper>
  );
};

export default ProposalsDisplay;
