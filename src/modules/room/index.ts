import { Application } from "express";
import middleware from "../../core/middleware";
import roomController from "./room.controller";
export const roomRoutes = (app: Application) => {
  app.post(
    "/api/v1/room/message",
    middleware.authenticate,
    roomController.createRoomMessage
  );
  app.post("/api/v1/room", middleware.authenticate, roomController.createRoom);
  app.post(
    "/api/v1/room/leave",
    middleware.authenticate,
    roomController.leaveRoom
  );
  app.get("/api/v1/search-room", roomController.getRoomsByTitle);

  app.get("/api/v1/room/user/:userId", roomController.getRoomsByUserId);
  app.post("/api/v1/room/join", roomController.joinRoom);
};
