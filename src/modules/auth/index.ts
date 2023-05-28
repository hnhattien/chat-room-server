import { Application } from "express";
import authController from "./auth.controller";
import middleware from "../../core/middleware";
export const authRoutes = (app: Application) => {
  app.post("/api/v1/auth/login", authController.loginAction);
  app.post("/api/v1/auth/logout", authController.logoutAction);
  app.post("/api/v1/auth/register", authController.registerAction);
  app.get(
    "/api/v1/auth/me",
    middleware.authenticate,
    authController.getMeAction
  );
};
