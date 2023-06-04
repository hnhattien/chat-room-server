/*
  Warnings:

  - You are about to drop the column `deleted` on the `TokenRotation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TokenRotation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "TokenRotation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TokenRotation" ("createdAt", "id", "jti", "updatedAt", "userId") SELECT "createdAt", "id", "jti", "updatedAt", "userId" FROM "TokenRotation";
DROP TABLE "TokenRotation";
ALTER TABLE "new_TokenRotation" RENAME TO "TokenRotation";
CREATE UNIQUE INDEX "TokenRotation_userId_key" ON "TokenRotation"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
