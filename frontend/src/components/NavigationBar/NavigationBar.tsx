import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "./NavigationBar.style";

const NavigationBar = () => {
  return (
    <Wrapper>
      <NavLink
        to="old"
        className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
      >
        <h5>Old</h5>
      </NavLink>
      <NavLink
        to=""
        className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
      >
        <h5>Current</h5>
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
