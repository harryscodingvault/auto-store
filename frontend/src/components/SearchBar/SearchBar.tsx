import React, { useState } from "react";
import FormInput from "../FormComponents/FormInput/FormInput";
import { Wrapper } from "./SearchBar.style";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchTerm,
  clearAllProposalsState,
} from "../../redux/allProposals/allProposalsSlice";

const SearchBar = () => {
  const { search } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();

  const handleChange = (e: React.FormEvent) => {
    const thisValue = (e.target as HTMLInputElement).value;
    dispatch(changeSearchTerm(thisValue));
  };

  return (
    <Wrapper>
      <input className="form-input" value={search} onChange={handleChange} />
      <div className="icon-container">
        <GoSearch className="icon" />
      </div>
      <div
        className="btn"
        onClick={() => {
          dispatch(clearAllProposalsState());
        }}
      >
        <h5>Clear</h5>
      </div>
    </Wrapper>
  );
};

export default SearchBar;
