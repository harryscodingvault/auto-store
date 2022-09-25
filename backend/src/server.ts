import express from "express";
import http from "http";
import cors from "cors";
import socketioApp from "./socketio/socketio";

const app = express();
const server = http.createServer(app);

socketioApp(server);

app.use(cors());

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Getting server at port ${port}`);
});
