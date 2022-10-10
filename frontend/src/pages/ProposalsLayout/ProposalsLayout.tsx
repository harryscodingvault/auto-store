import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Wrapper } from "./ProposalsLayout.style";

const Proposals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { isEditing } = useSelector((store: any) => store.proposal);

  useEffect(() => {
    if (pathname === "/workshop") {
      navigate("private");
    }
  }, [pathname, navigate]);
  return (
    <Wrapper>
      <NavigationBar
        destinationList={[
          { href: "private", title: "Private" },
          { href: "shared", title: "Shared" },
          { href: "create", title: isEditing ? "Edit" : "Create" },
        ]}
      />
      <main className="main-container">
        <Outlet />
      </main>
    </Wrapper>
  );
};

export default Proposals;
