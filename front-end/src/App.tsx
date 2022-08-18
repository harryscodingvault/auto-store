import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllProposals from "./pages/AllProposals/AllProposals";
import CreateProposal from "./pages/CreateProposal/CreateProposal";
import Error from "./pages/Error/Error";
import Landing from "./pages/Landing/Landing";
import Layout from "./pages/Layout/Layout";
import Proposals from "./pages/Proposals/Proposals";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import SignIn from "./pages/SignIn/SignIn";
import UserProposals from "./pages/UserProposals/UserProposals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="proposals"
            element={
              <ProtectedRoute>
                <Proposals />
              </ProtectedRoute>
            }
          >
            <Route path="all" element={<AllProposals />} />
            <Route path="mine" element={<UserProposals />} />
            <Route path="create" element={<CreateProposal />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
