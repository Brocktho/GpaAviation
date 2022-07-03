/*
  Warnings:

  - The primary key for the `Weather` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Weather" ("code", "description", "icon") SELECT "code", "description", "icon" FROM "Weather";
DROP TABLE "Weather";
ALTER TABLE "new_Weather" RENAME TO "Weather";
CREATE UNIQUE INDEX "Weather_code_key" ON "Weather"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
