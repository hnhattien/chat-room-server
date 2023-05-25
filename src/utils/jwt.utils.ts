import { verify, sign, decode } from "jsonwebtoken";

const signToken = (payload) => {
  return sign(payload);
};
