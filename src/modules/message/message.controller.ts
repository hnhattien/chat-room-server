import { NextFunction, Request, Response } from "express";
import { filter, get, map, omit, pick, set } from "lodash";
import messageService from "./message.service";

const getMessageByChannelId = async (
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
    if (get(req.params, "channelId")) {
      query["channelId"] = get(req.params, "channelId");
    }
    res.send(await messageService.getMessageByChannelId(query, options));
  } catch (err) {
    next(err);
  }
};

export default {
  getMessageByChannelId,
};
