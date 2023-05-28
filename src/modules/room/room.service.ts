import { Room, User, User_Room } from "@prisma/client";
import prismaClient from "../../core/database/prismaClient";
import { get, map } from "lodash";
import paginationUtil from "../../utils/pagination.util";
const createRoom = async (room: Partial<Room>, defaultMembers: User[]) => {
  return await prismaClient.room.create({
    data: {
      ...(room as Room),
      users: {
        create: map(defaultMembers, (user) => {
          return {
            userId: user.id,
          };
        }),
      },
    },
  });
};
const getRooms = async (query: any, options: any) => {
  const { offset, limit } = paginationUtil.getPaginationFromQuery(options);
  const dbQuery: any = {};
  if (get(query, "title")) {
    dbQuery["where"] = {};
  }
  return await prismaClient.room.findMany({
    where: {
      ...(query || {}),
    },
    take: limit,
    skip: offset,
  });
};
export default {
  createRoom,
  getRooms,
};
