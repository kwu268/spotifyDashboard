import prisma from "@/lib/prisma";
import { TopArtistModel } from "../../../../generated/prisma/models/TopArtist";
import { TopTrackModel } from "../../../../generated/prisma/models/TopTrack";

export const fetchTopTracks = async (
  userId: string,
  orderBy: "rank" | "popularity" = "rank"
): Promise<TopTrackModel[]> => {
  const result = prisma.topTrack.findMany({
    where: { userId },
    orderBy: { [orderBy]: "asc" },
    take: 100,
  });
  return result;
};

export const fetchTopArtists = async (
  userId: string,
  orderBy: "rank" | "popularity" = "rank"
): Promise<TopArtistModel[]> => {
  const result = prisma.topArtist.findMany({
    where: { userId },
    orderBy: { [orderBy]: "asc" },
    take: 100,
  });

  return result;
};
