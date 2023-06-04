import { Application } from "express";
import middleware from "../../core/middleware";
import channelController from "./channel.controller";
export const channelRoutes = (app: Application) => {
  app.post(
    "/api/v1/channel/message",
    middleware.authenticate,
    channelController.createChannelMessage
  );
  app.post(
    "/api/v1/channel",
    middleware.authenticate,
    channelController.createChannel
  );
  app.post(
    "/api/v1/channel/leave",
    middleware.authenticate,
    channelController.leaveChannel
  );
  app.get("/api/v1/search-channel", channelController.getChannelsByTitle);

  app.get(
    "/api/v1/channel/user/:userId",
    channelController.getChannelsByUserId
  );
  app.post("/api/v1/channel/join", channelController.joinChannel);
};
