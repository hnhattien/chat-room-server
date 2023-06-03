import socketConstant from "@core/constant/socketConstant";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socketEvents = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.of("/chat").on("connection", (socket) => {
    console.log("a user connected");
    socket.on("join room", (roomId) => {
      socket.join(roomId);
    });
    socket.on(
      socketConstant.SEND_NEW_ROOM_MESSAGE,
      (data: { roomId: string; message: string; sender: string }) => {
        const { message, roomId, sender } = data || {};
        socket.in(roomId).emit(socketConstant.SEND_NEW_ROOM_MESSAGE, {
          roomId: roomId,
          message: message,
          username: sender,
        });
      }
    );
    socket.on(socketConstant.RECEIVE_NEW_ROOM_MESSAGE, (data) => {
      socket.broadcast.emit(socketConstant.RECEIVE_NEW_ROOM_MESSAGE, data);
    });
  });
  io.of("/video").on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (data, callback) => {
      console.log(data);
      callback({ ok: "ok" });
      socket.broadcast.emit("serverMessage", { message: data.message });
    });
  });
};

export default socketEvents;
