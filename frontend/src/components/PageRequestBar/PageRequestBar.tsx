import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./PageRequestBar.style";
import { changePage } from "../../redux/allProposals/allProposalsSlice";

const PageRequestBar = () => {
  const { numOfPages, page } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();

  console.log(page);

  const nextPage = () => {
    let newPage = Number(page) + 1;

    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = Number(page) - 1;
    if (newPage === 1) {
      newPage = 1;
    }

    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      {page !== "1" && (
        <div className="btn" onClick={() => prevPage()}>
          <h5>Prev</h5>
        </div>
      )}

      <h5 className="page">Page:{page}</h5>

      {numOfPages !== 1 && (
        <div className="btn" onClick={() => nextPage()}>
          <h5>Next</h5>
        </div>
      )}
    </Wrapper>
  );
};

export default PageRequestBar;
