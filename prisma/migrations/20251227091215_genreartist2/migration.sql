/*
  Warnings:

  - The `artistGenre` column on the `TopTrack` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TopTrack" DROP COLUMN "artistGenre",
ADD COLUMN     "artistGenre" TEXT[];
