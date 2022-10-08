import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Wrapper } from "./AccountLayout.style";

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/account") {
      navigate("profile");
    }
  }, [pathname, navigate]);
  return (
    <Wrapper>
      <NavigationBar
        destinationList={[
          { href: "profile", title: "Profile" },
          { href: "edit", title: "Edit" },
          { href: "logout", title: "Logout" },
        ]}
      />
      <main className="main-container">
        <Outlet />
      </main>
    </Wrapper>
  );
};

export default AccountLayout;
