import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Wrapper } from "./HomeLayout.style";

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/home") {
      navigate("active");
    }
  }, [pathname, navigate]);
  return (
    <Wrapper>
      <NavigationBar
        destinationList={[
          { href: "active", title: "Active" },
          { href: "expired", title: "Expired" },
        ]}
      />
      <main className="main-container">
        <Outlet />
      </main>
    </Wrapper>
  );
};

export default HomeLayout;
