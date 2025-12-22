-- CreateIndex
CREATE INDEX "TopArtist_userId_idx" ON "TopArtist"("userId");

-- CreateIndex
CREATE INDEX "TopArtist_rank_idx" ON "TopArtist"("rank");

-- CreateIndex
CREATE INDEX "TopTrack_userId_idx" ON "TopTrack"("userId");

-- CreateIndex
CREATE INDEX "TopTrack_rank_idx" ON "TopTrack"("rank");
