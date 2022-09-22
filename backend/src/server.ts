import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

let count = 0;

io.on("connection", (socket: any) => {
  console.log("new connection");
  socket.emit("count update!", count);
  socket.on("increment", () => {
    count++;
    socket.emit("countUpdated", count);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Getting server at port ${port}`);
});
