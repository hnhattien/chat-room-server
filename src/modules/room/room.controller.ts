import { NextFunction, Request, Response } from "express";
import roomService from "./room.service";
import { Room } from "@prisma/client";
import { filter, get, map, omit, pick, set } from "lodash";
import prismaClient from "../../core/database/prismaClient";
import imageToBase64 from "image-to-base64";
import { v4 } from "uuid";
import imagekitUtil from "src/utils/imagekit.util";
const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const room = pick(req.body, ["title", "maxClient", "avatar"]);

    room.maxClient = Number(room.maxClient);
    const imageID = v4();
    imagekitUtil.upload(imageID, room.avatar);
    room.avatar = imageID;
    const usernames = filter(req.body.usernames, (el) => el);
    const users = await prismaClient.user.findMany({
      where: {
        username: {
          in: usernames,
        },
      },
    });
    console.log(users);
    const data = await roomService.createRoom(room, users);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getRoomsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params || {};

    res.send(await roomService.getRoomsByUserId(userId));
  } catch (err) {
    next(err);
  }
};
const createRoomMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const messageData = pick(req.body, ["roomId", "message", "userId"]);
    const data = await roomService.createRoomMessage(messageData);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getRoomsByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const title = get(req.query, "q");
    const data = await roomService.findRoomsByTitle(title as string);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const joinRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, roomId } = req.body || {};
    const data = await roomService.joinRoom({ userId, roomId });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export default {
  createRoom,
  getRoomsByUserId,
  createRoomMessage,
  getRoomsByTitle,
  joinRoom,
};
