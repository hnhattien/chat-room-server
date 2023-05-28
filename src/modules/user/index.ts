import { Application } from "express";
import middleware from "../../core/middleware";
import userController from "./user.controller";
export const userRoutes = (app: Application) => {
  app.get(
    "/api/v1/user/get-usernames",
    middleware.authenticate,
    userController.getUserNamesByQuery
  );
};
