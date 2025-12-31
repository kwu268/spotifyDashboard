/*
  Warnings:

  - Added the required column `artist` to the `TrackFeatures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TrackFeatures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrackFeatures" ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
