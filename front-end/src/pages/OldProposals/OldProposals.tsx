import React from "react";
import ListCards from "../../components/ListCards/ListCards";

import { cards } from "../../cardList";

const OldProposals = () => {
  return (
    <div>
      <ListCards itemList={cards} />
    </div>
  );
};

export default OldProposals;
