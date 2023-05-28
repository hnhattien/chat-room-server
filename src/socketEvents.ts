import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socketEvents = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (data, callback) => {
      console.log(data);
      callback({ ok: "ok" });
      socket.broadcast.emit("serverMessage", { message: data.message });
    });
  });
};

export default socketEvents;
