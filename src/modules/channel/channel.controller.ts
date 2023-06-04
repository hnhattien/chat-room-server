import { NextFunction, Request, Response } from "express";
import channelService from "./channel.service";
import { Channel } from "@prisma/client";
import { filter, get, map, omit, pick, set } from "lodash";
import prismaClient from "../../core/database/prismaClient";
import imageToBase64 from "image-to-base64";
import { v4 } from "uuid";
import imagekitUtil from "src/utils/imagekit.util";
const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const channel = pick(req.body, ["title", "maxClient", "avatar"]);

    channel.maxClient = Number(channel.maxClient);
    const imageID = v4();
    imagekitUtil.upload(imageID, channel.avatar);
    channel.avatar = imageID;
    const usernames = filter(req.body.usernames, (el) => el);
    const users = await prismaClient.user.findMany({
      where: {
        username: {
          in: usernames,
        },
      },
    });
    console.log(users);
    const data = await channelService.createChannel(channel, users);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getChannelsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params || {};

    res.send(await channelService.getChannelsByUserId(userId));
  } catch (err) {
    next(err);
  }
};
const createChannelMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const messageData = pick(req.body, [
      "conversationId",
      "message",
      "senderId",
    ]);
    const data = await channelService.createChannelMessage(messageData);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getChannelsByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const title = get(req.query, "q");
    const data = await channelService.findChannelsByTitle(title as string);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const joinChannel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, channelId } = req.body || {};
    const data = await channelService.joinChannel({ userId, channelId });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const leaveChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, channelId } = req.body || {};
    const data = await channelService.leaveChannel({ userId, channelId });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export default {
  createChannel,
  getChannelsByUserId,
  createChannelMessage,
  getChannelsByTitle,
  joinChannel,
  leaveChannel,
};
