-- CreateTable
CREATE TABLE "TrackFeatures" (
    "id" TEXT NOT NULL,
    "spotifyTrackId" TEXT NOT NULL,
    "danceability" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "instrumentalness" INTEGER NOT NULL,
    "liveness" INTEGER NOT NULL,
    "loudness" INTEGER NOT NULL,
    "speechiness" INTEGER NOT NULL,
    "valence" INTEGER NOT NULL,

    CONSTRAINT "TrackFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrackFeatures_spotifyTrackId_idx" ON "TrackFeatures"("spotifyTrackId");
