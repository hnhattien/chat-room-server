import { Application } from "express";
import { authRoutes } from "./modules/auth/";
import { userRoutes } from "./modules/user";
import { roomRoutes } from "./modules/room";
import { messageRoutes } from "@modules/message";
export default (app: Application) => {
  authRoutes(app);
  userRoutes(app);
  roomRoutes(app);
  messageRoutes(app);
};
