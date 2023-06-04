import { Channel, User } from "@prisma/client";
import prismaClient from "../../core/database/prismaClient";
import { get, map } from "lodash";
import paginationUtil from "../../utils/pagination.util";
const createChannel = async (
  channel: Partial<Channel>,
  defaultMembers: User[]
) => {
  return await prismaClient.channel.create({
    data: {
      ...(channel as Channel),
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
const getChannelsByUserId = async (userId: string) => {
  return await prismaClient.channel.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
      conversation: true,
    },
  });
};
const findChannelsByTitle = async (title: string) => {
  return await prismaClient.channel.findMany({
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
const createChannelMessage = async (data: {
  conversationId: string;
  message: string;
  senderId: string;
}) => {
  const { message, conversationId, senderId } = data || {};
  return await prismaClient.message.create({
    data: {
      text: message,
      conversationId,
      senderId,
    },
  });
};
const joinChannel = async (data: { channelId: string; userId: string }) => {
  await prismaClient.channel.update({
    where: {
      id: data.channelId,
    },
    data: {
      users: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
  return await prismaClient.channel.findFirst({
    where: {
      id: data.channelId,
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

const leaveChannel = async (data: { channelId: string; userId: string }) => {
  await prismaClient.channel.update({
    where: {
      id: data.channelId,
    },
    data: {
      users: {
        disconnect: {
          id: data.userId,
        },
      },
    },
  });
  return {
    id: data.channelId,
  };
};

export default {
  createChannel,
  getChannelsByUserId,
  createChannelMessage,
  findChannelsByTitle,
  joinChannel,
  leaveChannel,
};
