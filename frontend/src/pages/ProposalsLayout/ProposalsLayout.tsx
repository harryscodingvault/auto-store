import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Wrapper } from "./ProposalsLayout.style";

const Proposals = () => {
  return (
    <Wrapper>
      <NavigationBar />
      <main className="main-container">
        <Outlet />
      </main>
    </Wrapper>
  );
};

export default Proposals;
