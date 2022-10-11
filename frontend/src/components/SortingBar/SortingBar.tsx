import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSort } from "../../redux/allProposals/allProposalsSlice";
import { Wrapper } from "./SortingBar.style";

const SortingBar = () => {
  const { totalProposals, sortOptions, sort } = useSelector(
    (store: any) => store.allProposals
  );
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <h5>QTY: {totalProposals}</h5>
      <div className="sorting">
        <h5>Sort By: </h5>

        <div className="select-group">
          <div className="sort-req" onClick={() => setSelect(!select)}>
            <h5>{sort}</h5>
          </div>

          {select && (
            <div className="select-sorts">
              {sortOptions.map((item: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="select-btn"
                    onClick={() => {
                      setSelect(false);
                      dispatch(changeSort(item));
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
