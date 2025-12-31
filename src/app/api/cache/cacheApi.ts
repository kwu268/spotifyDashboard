import prisma from "@/lib/prisma";
import type { TopArtistModel } from "../../../../generated/prisma/models/TopArtist";
import type { TopTrackModel } from "../../../../generated/prisma/models/TopTrack";
import type { TrackFeatures } from "../../../../generated/prisma/models/TrackFeatures";

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

export const fetchAudioFeats = async (
  userId: string,
): Promise<TrackFeatures[]> => {
  const result = prisma.trackFeatures.findMany({
    where: { userId },
    take: 100,
  });

  return result;
};
