import { get, pick } from "lodash";
import prismaClient from "../../core/database/prismaClient";
import { UnAuthenticated } from "../../core/types/ErrorTypes";
import bcryptUtil from "../../utils/bcrypt.util";
import { v4 } from "uuid";
import { accessTokenHelper, refreshTokenHelper } from "../../utils/jwt.util";
import { User } from "@prisma/client";
import config from "../../core/config";
import moment from "moment";
import { InputValidationError } from "../../core/types/ErrorTypes";

const authenticate = async (login: string, password: string) => {
  let user: User | null;
  user = await prismaClient.user.findFirst({
    where: {
      OR: [
        {
          email: login,
        },
        {
          username: login,
        },
      ],
    },
  });
  if (!user) {
    throw new UnAuthenticated();
  }
  // const partnerId = branchService.findBranchById(get(user, 'branchId'));
  const isPasswordMatched = await bcryptUtil.comparePassword(
    password,
    get(user, "password")
  );
  if (!isPasswordMatched) {
    throw new UnAuthenticated();
  }

  const sessionId = v4();

  const access_token: string = accessTokenHelper.issueAccessToken(
    get(user, "id"),
    sessionId,
    config.ACCESS_TOKEN_EXPIRES_IN
  );
  const refresh_token: string = refreshTokenHelper.issueRefreshToken(
    user.id,
    user.invalidateTokenUUID,
    config.REFRESH_TOKEN_EXPIRES_IN
  );
  const userInfo = pick<User>(user, ["email", "username", "name"]);
  return {
    userInfo,
    userId: get(user, "id"),
    sessionId,
    access_token,
    refresh_token,
    expires: moment(new Date())
      .add(config.ACCESS_TOKEN_EXPIRES_IN, "second")
      .toDate()
      .getTime(),
  };
};
const register = async (
  login: string,
  password: string,
  repeatPassword: string
) => {
  let user;
  user = await prismaClient.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
  });
  console.log(user);
  if (user) {
    throw new InputValidationError("User existed");
  }
  if (password !== repeatPassword) {
    throw new InputValidationError("Password not match");
  }
  const hashedPassword = await bcryptUtil.generateHash(password);
  await prismaClient.user.create({
    data: {
      email: login,
      username: login,
      password: hashedPassword,
      name: login,
      invalidateTokenUUID: v4(),
    },
  });
};
export default {
  authenticate,
  register,
};
