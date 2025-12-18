import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getValidAccessToken } from "@/lib/getValidAccountToken";
import { getUserTop } from "../spotifyApi";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { spotifyArtist, spotifyTrack } from "@/types/spotify";

export async function POST(request: Request) {
  console.log('INSIDE POST@@@@')
  try {
    // TODO: Step 1 - Get user session using getServerSession()
    // TODO: Check if session exists and has user.email
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json(
        { error: "Session unavailable" },
        { status: 401 }
      );

    // TODO: Step 2 - Get valid access token using getValidAccessToken(user.id)
    // TODO: Return 401 if no access token
    const accessToken = await getValidAccessToken(session?.user.id);
    if (!accessToken)
      return NextResponse.json(
        { error: "Access token cannot be found" },
        { status: 404 }
      );

    // TODO: Step 3 - Query database to get user from prisma.user.findUnique()
    // TODO: Use session.user.email to find user
    // TODO: Return 404 if user not found
    const currentUser = await prisma.account.findFirst({
      where: {
        userId: session?.user.id,
        provider: "spotify",
      },
    });
    // 2. If no account is found, throw error
    if (!currentUser)
      return NextResponse.json(
        { error: "User cannot be found" },
        { status: 404 }
      );

    // TODO: Step 4 - Fetch top tracks with long_term range
    // TODO: Use getUserTop(accessToken, "tracks", "long_term")
    // TODO: This returns paginated data (limit=50 by default)
    // TODO: Note: Need to paginate through ALL results, not just first 50
    //      Get total count from response.total
    //      Loop: offset = 0, then 50, then 100, etc. until offset >= total
    const topTrackArray: spotifyTrack[] = [];
    let trackOffset = 0;
    const MAX_RESULTS = 500; // Limit to top 500 for faster sync

    const firstTopTrackRes = await getUserTop(
      accessToken,
      "tracks",
      "long_term",
      trackOffset
    );
    const totalTracks = Math.min(firstTopTrackRes.total, MAX_RESULTS);

    while (trackOffset < totalTracks) {
      const currentTopTrackRes = await getUserTop(
        accessToken,
        "tracks",
        "long_term",
        trackOffset
      );
      topTrackArray.push(...(currentTopTrackRes.items as spotifyTrack[]));
      trackOffset += 50;
    }

    // TODO: Step 5 - Fetch top artists with long_term range
    // TODO: Use getUserTop(accessToken, "artists", "long_term")
    // TODO: Same pagination logic as tracks
    const topArtistsArray: spotifyArtist[] = [];
    let artistOffset = 0;

    const firstTopArtistsRes = await getUserTop(
      accessToken,
      "artists",
      "long_term",
      artistOffset
    );
    const totalArtists = Math.min(firstTopArtistsRes.total, MAX_RESULTS);

    while (artistOffset < totalArtists) {
      const currentTopTrackRes = await getUserTop(
        accessToken,
        "artists",
        "long_term",
        artistOffset
      );
      topArtistsArray.push(...(currentTopTrackRes.items as spotifyArtist[]));
      artistOffset += 50;
    }

    // TODO: Step 6 - For each top track, create/update in database
    // TODO: Loop through topTrackArray with index (for ranking)
    // TODO: Check if track already exists by spotifyTrackId using prisma.topTrack.findUnique()
    // TODO: If exists: update with new rank
    // TODO: If new: create entry with:
    //   - spotifyTrackId, title, artist (first artist name), albumImageUrl, rank (index + 1), popularit
    //topTrackArray
    let syncedTracks = 0;
    for (let index = 0; index < topTrackArray.length; index++) {
      const currentTrack = topTrackArray[index];
      const isExist = await prisma.topTrack.findUnique({
        where: {
          userId_spotifyTrackId: {
            userId: session?.user.id,
            spotifyTrackId: currentTrack.id,
          },
        },
      });

      if (isExist) {
        await prisma.topTrack.update({
          where: {
            userId_spotifyTrackId: {
              userId: session?.user.id,
              spotifyTrackId: currentTrack.id,
            },
          },
          data: { rank: index + 1 },
        });
      } else {
        await prisma.topTrack.create({
          data: {
            spotifyTrackId: currentTrack.id,
            title: currentTrack.name,
            artist: currentTrack.artists[0].name,
            albumImageUrl: currentTrack.album.images[0]?.url || null,
            rank: index + 1,
            popularity: currentTrack.popularity,
            userId: session?.user.id,
          },
        });
      }
      syncedTracks++;

      console.log(syncedTracks)
    }

    // TODO: Step 7 - For each top artist, create/update in database
    // TODO: Loop through topArtistsArray with index (for ranking)
    // TODO: Check if artist already exists by spotifyArtistId using prisma.topArtist.findUnique()
    // TODO: If exists: update with new rank, popularity, genres
    // TODO: If new: create entry with:
    //   - spotifyArtistId, name, genres (array), popularity, imageUrl (first image), rank (index + 1)
    //topArtistsArray
    let syncedArtists = 0;
    for (let index = 0; index < topArtistsArray.length; index++) {
      const currentArtist = topArtistsArray[index];
      const isExist = await prisma.topArtist.findUnique({
        where: {
          userId_spotifyArtistId: {
            userId: session?.user.id,
            spotifyArtistId: currentArtist.id,
          },
        },
      });

      if (isExist) {
        await prisma.topArtist.update({
          where: {
            userId_spotifyArtistId: {
              userId: session?.user.id,
              spotifyArtistId: currentArtist.id,
            },
          },
          data: { rank: index + 1 },
        });
      } else {
        await prisma.topArtist.create({
          data: {
            spotifyArtistId: currentArtist.id,
            name: currentArtist.name,
            genres: currentArtist.genres,
            popularity: currentArtist.popularity,
            imageUrl: currentArtist.images[0]?.url || null,
            rank: index + 1,
            userId: session?.user.id
          },
        });
      }
      syncedArtists++;
      console.log(syncedArtists)
    }




    // TODO: Step 8 - Count total synced tracks and artists
    // TODO: Track syncedTracksCount and syncedArtistsCount

    // TODO: Step 9 - Return success response with synced counts
    console.log('here@@@')

    return NextResponse.json(
      {
        message: "Top tracks and artists synced successfully",
        syncedTracks: syncedTracks, // TODO: Replace with syncedTracksCount
        syncedArtists: syncedArtists, // TODO: Replace with syncedArtistsCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing top tracks and artists:", error);
    return NextResponse.json(
      { error: "Failed to sync top tracks and artists" },
      { status: 500 }
    );
  }
}
