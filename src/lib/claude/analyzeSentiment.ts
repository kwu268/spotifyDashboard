"use server";

import type { TopTrackModel } from "@/generated/prisma/models/TopTrack";
import type { TrackFeatures } from "@/generated/prisma/models/TrackFeatures";
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

export const createInsight = async (
  audioFeatInfo: AudioFeatures,
  audioFeatArray: TrackFeatures[]
): Promise<Record<string, string>> => {
  console.log('inside!')
  
  // Format the audio features array
  const formattedFeatures = audioFeatArray.map(track => `
    Song: ${track.title || 'Unknown'}
    Artist: ${track.artist || 'Unknown'}
    - Danceability: ${track.danceability}
    - Energy: ${track.energy}
    - Instrumentalness: ${track.instrumentalness}
    - Liveness: ${track.liveness}
    - Loudness: ${track.loudness}
    - Speechiness: ${track.speechiness}
    - Valence: ${track.valence}
  `).join('\n');


  const response = await ollama.chat({
    model: "gemma3",
    messages: [
      {
        role: "user",
        content: `Given the averages of scores, along with the array of objects of each song with their individual score, create 4 insight comments for a user about their listening habits about 2 sentences each
                  
                  Individual Track Features:
                  ${formattedFeatures}
                  
                  Averages: ${JSON.stringify(audioFeatInfo)}

                  Provide 4 insights comments for a user about their listening habits in JSON format. Content should be at most 2 sentences, try to keep them short

                    example:
                    {
                      comment1: {title: "Extremes", content: ""Highest Danceability: "Blinding Lights" by The Weeknd (9.8). Lowest Instrumentalness: "Good 4 U" by Olivia Rodrigo (0) You have tracks at both ends of the spectrum!"}
                      comment2: {title: "Consistency", content: "Most consistent: Loudness (6.7). Most varied: Instrument (range: 8.9)"}
                      comment2: {title: "Consistency", content: "Most consistent: Loudness (6.7). Most varied: Instrument (range: 8.9)"}
                      comment2: {title: "Consistency", content: "Most consistent: Loudness (6.7). Most varied: Instrument (range: 8.9)"}

"}
                    }
                    ".`,
      },
    ],
    format: "json",
  });
  return JSON.parse(response.message.content);
};
