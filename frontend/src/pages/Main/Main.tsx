import React, { useEffect, useState } from "react";
import { Wrapper } from "./Main.style";
import { io } from "socket.io-client";

const Main = () => {
  const [counter, setCounter] = useState(0);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    setSocket(io(`ws://localhost:5000`));
  }, []);

  useEffect(() => {
    socket?.on("countUpdated", (count: any) => {
      setCounter(count);
      console.log("The counts has been updated", count);
    });
  }, [socket]);

  const chatHandler = () => {
    socket.emit("increment");
  };

  return (
    <Wrapper>
      Counter {counter}
      <div className="btn" onClick={chatHandler}>
        <h5>Counter</h5>
      </div>
    </Wrapper>
  );
};

export default Main;
