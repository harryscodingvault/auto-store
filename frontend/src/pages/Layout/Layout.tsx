import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Wrapper } from "./Layout.style";

const Layout = () => {
  const { user } = useSelector((store: any) => store.user);
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
