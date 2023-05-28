-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "invalidateTokenUUID" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'defaut_user.png'
);
INSERT INTO "new_User" ("avatar", "email", "id", "invalidateTokenUUID", "name", "password", "username") SELECT "avatar", "email", "id", "invalidateTokenUUID", "name", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "maxClient" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default_room.png'
);
INSERT INTO "new_Room" ("avatar", "id", "maxClient", "title") SELECT "avatar", "id", "maxClient", "title" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
