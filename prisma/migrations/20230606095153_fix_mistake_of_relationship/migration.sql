/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "channelId" TEXT NOT NULL,
    CONSTRAINT "Conversation_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conversation_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conversation" ("createdAt", "creatorId", "deleted", "id", "title", "updatedAt") SELECT "createdAt", "creatorId", "deleted", "id", "title", "updatedAt" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
CREATE UNIQUE INDEX "Conversation_channelId_key" ON "Conversation"("channelId");
CREATE TABLE "new_Channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "maxClient" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default_channel.png',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Channel" ("avatar", "createdAt", "deleted", "id", "isPrivate", "maxClient", "title", "updatedAt") SELECT "avatar", "createdAt", "deleted", "id", "isPrivate", "maxClient", "title", "updatedAt" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
