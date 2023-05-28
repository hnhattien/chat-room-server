import { NextFunction, Request, Response } from "express";
import {
  UnauthorizedError,
  ValidationFailedError,
} from "../../core/types/ErrorTypes";
import authService from "./auth.service";
import { get } from "lodash";
import { accessTokenHelper } from "../../utils/jwt.util";
import prismaClient from "../../core/database/prismaClient";

const loginAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body || {};
    if (!login) {
      throw new ValidationFailedError("Login are required.");
    }
    console.log(req.body);
    const auth = await authService.authenticate(login, password);
    res
      .cookie("access_token", auth.access_token, {
        maxAge: 900000,
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("refresh_token", auth.refresh_token, {
        maxAge: 900000,
        httpOnly: true,
        sameSite: "strict",
      })
      .send(auth);
  } catch (err) {
    next(err);
  }
};

const logoutAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token").clearCookie("refresh_token").send({
      message: "Logout success",
    });
  } catch (err) {
    next(err);
  }
};

const registerAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password, repeatPassword } = req.body || {};
    if (!login || !password || !repeatPassword) {
      throw new ValidationFailedError("Missing info.");
    }
    await authService.register(login, password, repeatPassword);
    res.send({ message: "Register ok" });
  } catch (err) {
    next(err);
  }
};

const getMeAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Hihi");
    const access_token = get(req.cookies, "access_token");
    const userId = get(req, "userId");
    if (userId) {
      //const tokenDetail = accessTokenHelper.verifyAccessToken(access_token);
      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
        },
      });
      res.send(user);
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  loginAction,
  logoutAction,
  registerAction,
  getMeAction,
};
