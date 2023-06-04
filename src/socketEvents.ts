import socketConstant from "@core/constant/socketConstant";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socketEvents = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.of("/chat").on("connection", (socket) => {
    console.log("a user connected");
    socket.on(socketConstant.JOIN_CHAT_ROOM, (data, callback) => {
      const { channelId, username } = data || {};
      if (channelId) {
        socket.join(channelId);
      }
      // callback({
      //   message: `${username} joined channel.`,
      // });
    });
    socket.on(
      socketConstant.SEND_NEW_ROOM_MESSAGE,
      (data: { channelId: string; message: string; sender: string }) => {
        const { message, channelId, sender } = data || {};
        socket.broadcast
          .in(channelId)
          .emit(socketConstant.RECEIVE_NEW_ROOM_MESSAGE, {
            channelId: channelId,
            message: message,
            username: sender,
          });
      }
    );
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
