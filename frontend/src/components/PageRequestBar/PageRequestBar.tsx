import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./PageRequestBar.style";

const PageRequestBar = () => {
  const { numOfPages, page } = useSelector((store: any) => store.allProposals);
  const dispatch = useDispatch();
  const [minIndex, setMinIndex] = useState(0);
  const basicIndex = 0;
  const maxIndex = 5;

  const pages = Array.from({ length: 20 }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    console.log("Next page");
  };

  const prevPage = () => {
    console.log("Previous page");
  };

  return (
    <Wrapper>
      <div className="btn">
        <h5>Prev</h5>
      </div>
      <div className="page-btn-list">
        {pages.map((item, index) => {
          if (index - 2 <= minIndex && index + 2 >= minIndex) {
            return (
              <div
                className={`btn ${item === page && "pageOn"}`}
                key={index}
                onClick={() => setMinIndex(index)}
              >
                <h5>{item}</h5>
              </div>
            );
          }
        })}
      </div>

      <div className="btn">
        <h5>Next</h5>
      </div>
    </Wrapper>
  );
};

export default PageRequestBar;
