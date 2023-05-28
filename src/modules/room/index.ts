import { Application } from "express";
import middleware from "../../core/middleware";
import roomController from "./room.controller";
export const roomRoutes = (app: Application) => {
  app.post("/api/v1/room", middleware.authenticate, roomController.createRoom);
  app.get("/api/v1/room", roomController.getRooms);
};
