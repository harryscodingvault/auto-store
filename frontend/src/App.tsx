import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Error from "./pages/Error/Error";
import ProposalsLayout from "./pages/ProposalsLayout/ProposalsLayout";
import CurrentProposals from "./pages/CurrentProposals/CurrentProposals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="home" element={<Layout />}>
            <Route path="proposals" element={<ProposalsLayout />}>
              <Route index element={<CurrentProposals />} />
            </Route>
            <Route path="create" element={<Home />} />

            <Route path="profile" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
