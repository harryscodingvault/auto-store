import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./PageRequestBar.style";
import { changePage } from "../../redux/allProposals/allProposalsSlice";

const PageRequestBar = () => {
  const { numOfPages, page } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();

  console.log(page);

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage <= 0) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <div className="btn" onClick={() => prevPage()}>
        <h5>Prev</h5>
      </div>
      <div className="page-btn-list">
        {pages.map((pageNumber) => {
          if (pageNumber - 2 <= page && pageNumber + 2 >= page) {
            return (
              <div
                className={`btn ${pageNumber === page && "pageOn"}`}
                key={pageNumber}
                onClick={() => dispatch(changePage(pageNumber))}
              >
                <h5>{pageNumber}</h5>
              </div>
            );
          }
        })}
      </div>

      <div className="btn" onClick={() => nextPage()}>
        <h5>Next</h5>
      </div>
    </Wrapper>
  );
};

export default PageRequestBar;
