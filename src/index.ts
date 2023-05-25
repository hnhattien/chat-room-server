import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3100, () => {
  console.log("listening on *:3100");
});
