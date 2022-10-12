import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";

import Layout from "./pages/Layout/Layout";
import Error from "./pages/Error/Error";
import ProposalsLayout from "./pages/ProposalsLayout/ProposalsLayout";

import CreateProposal from "./pages/CreateProposal/CreateProposal";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";

import SearchProposals from "./pages/SearchProposals/SearchProposals";

import HomeLayout from "./pages/HomeLayout/HomeLayout";
import AccountLayout from "./pages/AccountLayout/AccountLayout";
import EditProfile from "./pages/EditProfile/EditProfile";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import ProposalsDisplay from "./pages/ProposalsDisplay/ProposalsDisplay";
import Shared from "./pages/Shared/Shared";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="registration" element={<Registration />} />
          <Route path="shared">
            <Route path=":id" element={<Shared />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="home" element={<HomeLayout />}>
              <Route
                path="active"
                element={<ProposalsDisplay urlType="active" />}
              />
              <Route
                path="expired"
                element={<ProposalsDisplay urlType="expired" />}
              />
              <Route path="search" element={<SearchProposals />} />
            </Route>
            <Route path="workshop" element={<ProposalsLayout />}>
              <Route
                path="private"
                element={<ProposalsDisplay urlType="private" />}
              />
              <Route
                path="shared"
                element={<ProposalsDisplay urlType="shared" />}
              />
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
