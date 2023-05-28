import { NextFunction, Request, Response } from "express";
import { filter, get, map, omit, pick, set } from "lodash";
import messageService from "./message.service";

const getMessageByRoomId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: any = {};
    if (get(req.query, "page") && get(req.query, "limit")) {
      options["page"] = get(req.query, "page");
      options["limit"] = get(req.query, "limit");
    }
    let query: any = {};
    if (get(req.params, "roomId")) {
      query["roomId"] = get(req.params, "roomId");
    }
    res.send(await messageService.getMessageByRoomId(query, options));
  } catch (err) {
    next(err);
  }
};

export default {
  getMessageByRoomId,
};
