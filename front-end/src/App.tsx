import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Error from "./pages/Error/Error";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
