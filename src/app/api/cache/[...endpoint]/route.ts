import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { fetchTopArtists, fetchTopTracks } from "../cacheApi";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ endpoint: string[] }> }
) {
  try {
    const { endpoint } = await params;
    const [currentApi] = endpoint;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Session unavailable" },
        { status: 401 }
      );
    }

    switch (currentApi) {
      case "fetchTopArtist":
        return NextResponse.json(await fetchTopArtists(session.user.id));

      case "fetchTopTracks":
        return NextResponse.json(await fetchTopTracks(session.user.id));

      default:
        return NextResponse.json(
          { error: "Unknown endpoint" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Something went wrong during the Cache Route: ", error);
    return NextResponse.json(
      {
        error: "Failed to fetch from Cache Endpoint",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
