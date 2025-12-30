/*
  Warnings:

  - A unique constraint covering the columns `[spotifyTrackId]` on the table `TrackFeatures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrackFeatures_spotifyTrackId_key" ON "TrackFeatures"("spotifyTrackId");
