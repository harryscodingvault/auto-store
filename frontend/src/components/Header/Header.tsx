import React from "react";
import { Wrapper } from "./Header.style";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
        >
          <h5>Home</h5>
        </NavLink>
        <NavLink
          to="/workshop"
          className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
        >
          <h5>Workshop</h5>
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
        >
          <h5>Account</h5>
        </NavLink>
      </>
    </Wrapper>
  );
};

export default Header;
