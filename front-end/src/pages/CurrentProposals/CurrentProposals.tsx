import React from "react";
import { cards } from "../../cardList";
import ListCards from "../../components/ListCards/ListCards";

const UserProposals = () => {
  const filteredCards = cards.filter((item) => item.active === true);

  return (
    <div>
      <ListCards itemList={filteredCards} />
    </div>
  );
};

export default UserProposals;
