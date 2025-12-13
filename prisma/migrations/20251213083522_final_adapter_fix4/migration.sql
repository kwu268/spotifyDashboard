/*
  Warnings:

  - A unique constraint covering the columns `[spotifyTrackId,playedAt]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_userId_key";

-- DropIndex
DROP INDEX "Session_userId_key";

-- DropIndex
DROP INDEX "Track_userId_key";

-- DropIndex
DROP INDEX "Track_userId_spotifyTrackId_playedAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "Track_spotifyTrackId_playedAt_key" ON "Track"("spotifyTrackId", "playedAt");
