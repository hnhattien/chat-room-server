import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();
const ACCESS_TOKEN_FILE =
  process.env.NODE_ENV === "production"
    ? "access_token_secret_prod.pem"
    : "access_token_secret_dev.pem";
const REFRESH_TOKEN_FILE =
  process.env.NODE_ENV === "production"
    ? "refresh_token_secret_prod.pem"
    : "refresh_token_secret_dev.pem";
const JWT_ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.join(process.cwd(), `${ACCESS_TOKEN_FILE}`),
  "utf8"
);
const JWT_REFRESH_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.join(path.join(process.cwd(), REFRESH_TOKEN_FILE)),
  "utf8"
);
const ACCESS_TOKEN_EXPIRES_IN = isNaN(
  Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
)
  ? process.env.ACCESS_TOKEN_EXPIRES_IN
  : Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
const REFRESH_TOKEN_EXPIRES_IN = isNaN(
  Number(process.env.REFRESH_TOKEN_EXPIRES_IN)
)
  ? process.env.REFRESH_TOKEN_EXPIRES_IN
  : Number(process.env.REFRESH_TOKEN_EXPIRES_IN);

const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY as string;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY as string;
const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT as string;
export default {
  JWT_ACCESS_TOKEN_PRIVATE_KEY,
  JWT_REFRESH_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT,
};
