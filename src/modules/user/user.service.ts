import prismaClient from "../../core/database/prismaClient";

const getUserNameByQuery = async (query: string) => {
  const usernames = prismaClient.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    select: {
      username: true,
    },
  });
  return usernames;
};

export default {
  getUserNameByQuery,
};
