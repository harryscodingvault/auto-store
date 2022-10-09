import React from "react";
import ListCards from "../../components/ListCards/ListCards";

import { cards } from "../../cardList";

const SharedProposals = () => {
  const filteredCards = cards.filter((item) => item.active === false);

  return (
    <div>
      <ListCards itemList={filteredCards} />
    </div>
  );
};

export default SharedProposals;
