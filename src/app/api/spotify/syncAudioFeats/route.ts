import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getValidAccessToken } from "@/lib/getValidAccountToken";
import { getUserTop, getTrackInfo, getArtistInfo } from "../spotifyApi";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { spotifyArtist, spotifyTrack } from "@/types/spotify";
import { analyzeSentiment } from "@/lib/claude/analyzeSentiment";
import { fetchTopTracks } from "../../cache/cacheApi";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json(
        { error: "Session unavailable" },
        { status: 401 }
      );
    const topTracks = await fetchTopTracks(session.user.id);
    for (let i = 0; i < topTracks.length; i++) {
      console.log("syncing auido feats: ", i);
      const audioFeats = await analyzeSentiment(topTracks[i]);
      const currentTrackId = topTracks[i].spotifyTrackId;

      const isExist = await prisma.trackFeatures.findUnique({
        where: {
          spotifyTrackId: currentTrackId,
        },
      });

      if (!isExist) {
        await prisma.trackFeatures.create({
          data: {
            userId: session.user.id,
            title: topTracks[i].title,
            artist: topTracks[i].artist,
            spotifyTrackId: currentTrackId,
            danceability: audioFeats.danceability,
            energy: audioFeats.energy,
            instrumentalness: audioFeats.instrumentalness,
            liveness: audioFeats.liveness,
            loudness: audioFeats.loudness,
            speechiness: audioFeats.speechiness,
            valence: audioFeats.valence,
            artistGenre: topTracks[i].artistGenre,
          },
        });
      }
    }
    return NextResponse.json(
      {
        message: "Audio feat synced successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing Audio feat :", error);
    return NextResponse.json(
      { error: "Failed to sync Audio feat " },
      { status: 500 }
    );
  }
}
