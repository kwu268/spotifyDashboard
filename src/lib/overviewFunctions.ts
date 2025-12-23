import type { TopArtistModel } from "@/generated/prisma/models/TopArtist";
import type { TopTrackModel } from "@/generated/prisma/models/TopTrack";
export const averagePopularity = (topTracksArray: TopTrackModel[]): number => {
  const popularityArray: number[] = [];
  topTracksArray.forEach((currentTrack) => {
    popularityArray.push(currentTrack.popularity!);
  });

  const popularitySum = popularityArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return popularitySum / popularityArray.length;
};

export const popularityRange = (topTracksArray: TopTrackModel[]): string => {
  const popularityArray: number[] = Array.from(
    new Set(topTracksArray.map((currentTrack) => currentTrack.popularity!))
  );

  return `${Math.min(...popularityArray)} to ${Math.max(...popularityArray)}`;
};

export const uniqueGenere = (topArtistArrray: TopArtistModel[]): number => {
  const genresArray: string[] = Array.from(
    new Set(topArtistArrray.flatMap((currentArtist) => currentArtist.genres))
  );
  return genresArray.length;
};
