-- CreateTable
CREATE TABLE "TopTrack" (
    "id" TEXT NOT NULL,
    "spotifyTrackId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "albumImageUrl" TEXT,
    "rank" INTEGER NOT NULL,
    "popularity" INTEGER,
    "danceability" DOUBLE PRECISION,
    "energy" DOUBLE PRECISION,
    "valence" DOUBLE PRECISION,
    "tempo" DOUBLE PRECISION,
    "instrumentalness" DOUBLE PRECISION,
    "acousticness" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TopTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopArtist" (
    "id" TEXT NOT NULL,
    "spotifyArtistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genres" TEXT[],
    "popularity" INTEGER,
    "imageUrl" TEXT,
    "rank" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TopArtist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TopTrack_userId_spotifyTrackId_key" ON "TopTrack"("userId", "spotifyTrackId");

-- CreateIndex
CREATE UNIQUE INDEX "TopArtist_userId_spotifyArtistId_key" ON "TopArtist"("userId", "spotifyArtistId");

-- AddForeignKey
ALTER TABLE "TopTrack" ADD CONSTRAINT "TopTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopArtist" ADD CONSTRAINT "TopArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
