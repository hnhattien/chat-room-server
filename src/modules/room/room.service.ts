import { Room, User } from "@prisma/client";
import prismaClient from "../../core/database/prismaClient";
import { get, map } from "lodash";
import paginationUtil from "../../utils/pagination.util";
const createRoom = async (room: Partial<Room>, defaultMembers: User[]) => {
  return await prismaClient.room.create({
    data: {
      ...(room as Room),
      users: {
        connect: map(defaultMembers, (user) => {
          return {
            id: user.id,
          };
        }),
      },
    },
  });
};
const getRoomsByUserId = async (userId: string) => {
  return await prismaClient.room.findMany({
    where: {
      users: {
        every: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });
};
const findRoomsByTitle = async (title: string) => {
  return await prismaClient.room.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    include: {
      users: true,
    },
  });
};
const createRoomMessage = async (data: {
  roomId: string;
  message: string;
  userId: string;
}) => {
  const { message, roomId, userId } = data || {};
  return await prismaClient.message.create({
    data: {
      text: message,
      roomId,
      userId,
    },
  });
};
const joinRoom = async (data: { roomId: string; userId: string }) => {
  await prismaClient.room.update({
    where: {
      id: data.roomId,
    },
    data: {
      users: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
  return await prismaClient.room.findFirst({
    where: {
      id: data.roomId,
    },
    include: {
      users: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
};

export default {
  createRoom,
  getRoomsByUserId,
  createRoomMessage,
  findRoomsByTitle,
  joinRoom,
};
