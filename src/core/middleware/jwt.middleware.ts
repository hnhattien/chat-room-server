import { NextFunction, Request, Response } from "express";
import { get, set } from "lodash";
import { UnAuthenticated, UnauthorizedError } from "../types/ErrorTypes";
import { accessTokenHelper, refreshTokenHelper } from "../../utils/jwt.util";
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = get(req.cookies, "access_token");
  if (!token) {
    throw new UnAuthenticated();
  }
  try {
    const tokenDetail = accessTokenHelper.verifyAccessToken(token);

    if (!tokenDetail) {
      throw new UnauthorizedError();
    }
    set(req, "userId", tokenDetail.id);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { authenticate };
