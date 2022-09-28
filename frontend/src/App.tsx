import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="room">
            <Route path=":id" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
