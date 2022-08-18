import React from "react";
import { Wrapper } from "./Header.style";

import { NavLink } from "react-router-dom";

const Header = () => {
  const user = true;
  return (
    <Wrapper>
      {user && (
        <>
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
          >
            <h5>Profile</h5>
          </NavLink>
          <NavLink
            to="proposals"
            className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
          >
            <h5>Proposals</h5>
          </NavLink>
          <div className="nav nav-logout">
            <h5>Logout</h5>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
