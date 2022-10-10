import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./SortingBar.style";

const SortingBar = () => {
  const { totalProposals } = useSelector((store: any) => store.allProposals);
  const [select, setSelect] = useState(false);
  const [optionSelected, setOptionSelect] = useState("new");
  const sortingOptions = ["new", "old", "a-z", "z-a"];

  return (
    <Wrapper>
      <h5>QTY: {totalProposals}</h5>
      <div className="sorting">
        <h5>Sort By: </h5>

        <div className="select-group">
          <div className="sort-req" onClick={() => setSelect(!select)}>
            <h5>{optionSelected}</h5>
          </div>

          {select && (
            <div className="select-sorts">
              {sortingOptions.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="select-btn"
                    onClick={() => {
                      setOptionSelect(item);
                      setSelect(false);
                    }}
                  >
                    <h5>{item}</h5>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default SortingBar;
