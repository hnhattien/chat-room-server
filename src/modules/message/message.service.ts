import { Channel, User } from "@prisma/client";
import prismaClient from "../../core/database/prismaClient";
import { get, map } from "lodash";
import paginationUtil from "../../utils/pagination.util";

const getMessageByChannelId = async (query: any, options: any) => {
  const { offset, limit } = paginationUtil.getPaginationFromQuery(options);
  return await prismaClient.message.findMany({
    where: {
      ...(query || {}),
    },
    take: limit,
    skip: offset,
    include: {
      user: true,
      channel: true,
    },
  });
};

export default {
  getMessageByChannelId,
};
