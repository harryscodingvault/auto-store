import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";

function App() {
  const [socket, setSocket] = useState<any>(null);
  /*
  useEffect(() => {
    setSocket(io(`ws://localhost:5000`));
  }, []);*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home socket={socket} />} />
          <Route path="room">
            <Route path=":id" element={<Room socket={socket} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
