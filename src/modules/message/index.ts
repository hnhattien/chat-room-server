import { Application } from "express";
import middleware from "../../core/middleware";
import messageController from "./message.controller";
export const messageRoutes = (app: Application) => {
  app.get("/api/v1/message/room/:roomId", messageController.getMessageByRoomId);
};
