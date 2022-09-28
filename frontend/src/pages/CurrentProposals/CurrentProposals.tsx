import React, { useState } from "react";
import { cards } from "../../cardList";
import ListCards from "../../components/ListCards/ListCards";
import Modal from "../../components/Modal/Modal";

const UserProposals = () => {
  const filteredCards = cards.filter((item) => item.active === true);

  return (
    <div>
      <ListCards itemList={filteredCards} />
    </div>
  );
};

export default UserProposals;
