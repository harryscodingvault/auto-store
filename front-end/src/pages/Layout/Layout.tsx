import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Wrapper } from "./Layout.style";

const Layout = () => {
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
