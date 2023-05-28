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
const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options: any = {};
    if (get(req.query, "page") && get(req.query, "limit")) {
      options["page"] = get(req.query, "page");
      options["limit"] = get(req.query, "limit");
    }
    let query: any = {};
    if (get(req.query, "maxClient")) {
      query["maxClient"] = Number(get(req.query, "maxClient"));
    }

    if (get(req.query, "title")) {
      query["title"] = get(req.query, "title");
    }
    if (get(req.query, "id")) {
      query["id"] = get(req.query, "id");
    }
    res.send(await roomService.getRooms(query, options));
  } catch (err) {
    next(err);
  }
};
export default {
  createRoom,
  getRooms,
};
