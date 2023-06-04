import { Application } from "express";
import { authRoutes } from "./modules/auth/";
import { userRoutes } from "./modules/user";
import { channelRoutes } from "./modules/channel";
import { messageRoutes } from "@modules/message";
export default (app: Application) => {
  authRoutes(app);
  userRoutes(app);
  channelRoutes(app);
  messageRoutes(app);
};
