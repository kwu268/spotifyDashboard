import { getServerSession } from "next-auth/next";
import { getValidAccessToken } from "@/lib/getValidAccountToken";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import {
  getUserProfile,
  getUserPlaylists,
  getUserAlbums,
  getUserTop,
  getUserRecentlyPlayed,
} from "../spotifyApi";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpoint: string[] }> }
) {
  const { endpoint } = await params;
  const [currentApi] = endpoint;

  const url = new URL(request.url);
  const range = url.searchParams.get("range");

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Session unavailable" }, { status: 401 });
  }

  const accessToken = await getValidAccessToken(session?.user.id);
  if (!accessToken)
    return NextResponse.json(
      { error: "Access token cannot be found" },
      { status: 404 }
    );

  try {
    switch (currentApi) {
      case "userProfile":
        return NextResponse.json(await getUserProfile(accessToken));

      case "userPlaylist":
        return NextResponse.json(await getUserPlaylists(accessToken));

      case "userAlbum":
        return NextResponse.json(await getUserAlbums(accessToken));

      case "recentlyPlayed":
        return NextResponse.json(await getUserRecentlyPlayed(accessToken));

      case "topArtists":
        return NextResponse.json(
          await getUserTop(accessToken, "artists", range!, 50)
        );

      case "topTracks":
        return NextResponse.json(
          await getUserTop(accessToken, "tracks", range!, 50)
        );

      default:
        return NextResponse.json(
          { error: "Unknown endpoint" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Something went wrong during the spotifyAPI Route: ", error);
    return NextResponse.json(
      {
        error: "Failed to fetch from Spotify Endpoint",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
