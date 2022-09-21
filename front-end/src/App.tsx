import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//import OldProposals from "./pages/OldProposals/OldProposals";
import CreateProposal from "./pages/CreateProposal/CreateProposal";
import Error from "./pages/Error/Error";
import Landing from "./pages/Landing/Landing";
import Layout from "./pages/Layout/Layout";
import ProposalsLayout from "./pages/ProposalsLayout/ProposalsLayout";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import SignIn from "./pages/SignIn/SignIn";
import CurrentProposals from "./pages/CurrentProposals/CurrentProposals";
import EditProposal from "./pages/EditProposal/EditProposal";
import Profile from "./pages/Profile/Profile";

const OldProposals = React.lazy(
  () => import("./pages/OldProposals/OldProposals")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="proposals"
              element={
                <ProtectedRoute>
                  <ProposalsLayout />
                </ProtectedRoute>
              }
            >
              <Route path="old" element={<OldProposals />} />
              <Route path="current" element={<CurrentProposals />} />
              <Route path="create" element={<CreateProposal />} />
              <Route path="edit" element={<EditProposal />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
