import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "./NavigationBar.style";

interface destinationInterface {
  href: string;
  title: string;
}

const NavigationBar = ({
  destinationList,
}: {
  destinationList: destinationInterface[];
}) => {
  return (
    <Wrapper>
      {destinationList.map((destination) => {
        return (
          <NavLink
            to={destination.href}
            className={({ isActive }) => (isActive ? "nav active-nav" : "nav")}
            key={destination.href}
          >
            <h5>{destination.title}</h5>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default NavigationBar;
