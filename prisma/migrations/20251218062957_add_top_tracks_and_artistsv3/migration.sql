/*
  Warnings:

  - You are about to drop the column `acousticness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `danceability` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `instrumentalness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `tempo` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `valence` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "acousticness",
DROP COLUMN "danceability",
DROP COLUMN "energy",
DROP COLUMN "instrumentalness",
DROP COLUMN "tempo",
DROP COLUMN "valence";
