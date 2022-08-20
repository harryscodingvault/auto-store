import React from "react";
import { Wrapper } from "./ListCards.style";

import SingleCard from "./SingleCard/SingleCard";
import { proposalType } from "../../types/proposalType";

const ListCards = ({ itemList }: { itemList: proposalType[] }) => {
  return (
    <Wrapper>
      {itemList.map((item) => (
        <SingleCard item={item} key={item.id} />
      ))}
    </Wrapper>
  );
};

export default ListCards;
