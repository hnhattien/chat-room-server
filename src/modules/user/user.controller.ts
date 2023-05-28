import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

const getUserNamesByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.query.q as string;
    const users = await userService.getUserNameByQuery(username);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export default {
  getUserNamesByQuery,
};
