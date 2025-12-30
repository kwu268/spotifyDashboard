"use server";

import type { TopTrackModel } from "@/generated/prisma/models/TopTrack";
import ollama from "ollama";

interface AudioFeatures {
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  valence: number;
}

export const analyzeSentiment = async (
  topTrackInfo: TopTrackModel
): Promise<AudioFeatures> => {
  const response = await ollama.chat({
    model: "gemma3",
    messages: [
      {
        role: "user",
        content: `Analyze the mood/sentiment of this track based on its name, artist, and genres.
                  Track: ${topTrackInfo.title}
                  Artists: ${topTrackInfo.artist}
                  Genres: ${topTrackInfo.artistGenre?.join(", ") || "unknown"}

                  Provide a number value from 0-10 (can be up to 2 decimals) for the following features but in a json object:
                    danceability: number;
                    energy: number;
                    instrumentalness: number;
                    liveness: number;
                    loudness: number;
                    speechiness: number;
                    valence: number;

                    example:
                    {danceability: 0.11
                    energy: 2.74
                    instrumentalness: 6.27;
                    liveness: 2.54;
                    loudness: 1.66;
                    speechiness: 0.00;
                    valence?: 0.24}
                    ".`,
      },
    ],
    format: "json",
  });
  return JSON.parse(response.message.content);
};
