import React, { useState } from "react";
import { Wrapper } from "./SortingBar.style";

const SortingBar = () => {
  const [sortOld, setSortAge] = useState(true);
  const [sortAZ, setSortAZ] = useState(true);

  return (
    <Wrapper>
      <h5>Sort By: </h5>
      <div className="btn-group">
        <div className="sort-group">
          <div className="sort-req">
            <h5>new</h5>
          </div>
        </div>
        <div className="sort-group">
          <div className="sort-req">
            <h5>a-z</h5>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SortingBar;
