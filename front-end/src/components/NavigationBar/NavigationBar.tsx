import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "./NavigationBar.style";

const NavigationBar = () => {
  return (
    <Wrapper>
      <NavLink
        to="all"
        className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
      >
        <h5>All</h5>
      </NavLink>
      <NavLink
        to="mine"
        className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
      >
        <h5>Mine</h5>
      </NavLink>
      <NavLink
        to="create"
        className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
      >
        <h5>Create</h5>
      </NavLink>
    </Wrapper>
  );
};

export default NavigationBar;
