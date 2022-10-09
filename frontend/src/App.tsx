import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Error from "./pages/Error/Error";
import ProposalsLayout from "./pages/ProposalsLayout/ProposalsLayout";
import PrivateProposals from "./pages/PrivateProposals/PrivateProposals";
import SharedProposals from "./pages/SharedProposals/SharedProposals";
import CreateProposal from "./pages/CreateProposal/CreateProposal";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import ExpiredProposals from "./pages/ExpiredProposals/ExpiredProposals";
import SearchProposals from "./pages/SearchProposals/SearchProposals";
import ActiveProposals from "./pages/ActiveProposals/ActiveProposals";
import HomeLayout from "./pages/HomeLayout/HomeLayout";
import AccountLayout from "./pages/AccountLayout/AccountLayout";
import EditProfile from "./pages/EditProfile/EditProfile";
import LogoutPage from "./pages/LogoutPage/LogoutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="registration" element={<Registration />} />
          <Route element={<Layout />}>
            <Route path="home" element={<HomeLayout />}>
              <Route path="active" element={<ActiveProposals />} />
              <Route path="expired" element={<ExpiredProposals />} />
              <Route path="search" element={<SearchProposals />} />
            </Route>
            <Route path="workshop" element={<ProposalsLayout />}>
              <Route path="private" element={<PrivateProposals />} />
              <Route path="shared" element={<SharedProposals />} />
              <Route path="create" element={<CreateProposal />} />
            </Route>

            <Route path="account" element={<AccountLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
