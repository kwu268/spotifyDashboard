import { getServerSession } from "next-auth/next";
import { getValidAccessToken } from "@/lib/getValidAccountToken";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  const accessToken = await getValidAccessToken(session?.user.id);

  if (!session?.user.id) {
    return Response.json({ error: "Session unavailable" }, { status: 401 });
  }

  try {
    switch (currentApi) {
      case "userProfile":
        return Response.json(await getUserProfile(accessToken));

      case "userPlaylist":
        return Response.json(await getUserPlaylists(accessToken));

      case "userAlbum":
        return Response.json(await getUserAlbums(accessToken));

			case "recentlyPlayed":
        return Response.json(await getUserRecentlyPlayed(accessToken));

      case "topArtists":
        return Response.json(await getUserTop(accessToken, "artists", range!));

      case "topTracks":
        return Response.json(await getUserTop(accessToken, "tracks", range!));

      default:
        return Response.json({ error: "Unknown endpoint" }, { status: 400 });
    }
  } catch (error) {
		console.log("Something went wrong during the spotifyAPI Route: ", error);
		return Response.json({ error: "Failed to fetch from Spotify Endpoint " }, { status: 500 });
	}
}
