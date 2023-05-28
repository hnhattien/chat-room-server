-- CreateTable
CREATE TABLE "TokenRotation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "iat" TEXT NOT NULL
);
