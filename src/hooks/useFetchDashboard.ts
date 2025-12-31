import { useState, useCallback } from "react";
import { spotifyUser } from "@/types/spotify";
import type { TopArtistModel } from "../../generated/prisma/models/TopArtist";
import type { TopTrackModel } from "../../generated/prisma/models/TopTrack";
import type { TrackFeatures } from "../../../../generated/prisma/models/TrackFeatures";
import { createInsight } from "@/lib/claude/analyzeSentiment";

export const useFetchDashboard = () => {
  const [user, setUser] = useState<spotifyUser | undefined>(undefined);
  const [topArtists, setTopArtists] = useState<TopArtistModel[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrackModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [audioData, setAudioData] = useState({
    features: [] as TrackFeatures[],
    averages: {} as Record<string, number>,
    insightMessages: { insights: [] } as {
      insights: Record<string, string>[];
    }
  });

  const fetchTopItems = useCallback(async () => {
    try {
      setError(undefined);
      setIsLoading(true);

      const artistRes = await fetch("/api/cache/fetchTopArtist");
      if (!artistRes.ok) {
        throw new Error(
          `HTTP ${artistRes.status}: Artist: ${artistRes.statusText}`
        );
      }
      const artistData = await artistRes.json();
      setTopArtists(artistData);

      const trackRes = await fetch("/api/cache/fetchTopTracks");
      if (!trackRes.ok) {
        throw new Error(
          `HTTP ${trackRes.status}: Tracks: ${trackRes.statusText}`
        );
      }
      const trackData = await trackRes.json();
      setTopTracks(trackData);

      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching top items");
      setIsLoading(false);
      console.log(e);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      const res = await fetch("/api/spotify/userProfile");
      const data = await res.json();
      setUser(data);
      setIsLoading(false);
      console.log(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching user profile");
      setIsLoading(false);
      console.log(e);
    }
  }, []);

  const fetchAudioFeats = useCallback(async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      const audioFeatsRes = await fetch("/api/cache/fetchAudioFeats");
      if (!audioFeatsRes.ok) {
        throw new Error(
          `HTTP ${audioFeatsRes.status}: Audio Feats: ${audioFeatsRes.statusText}`
        );
      }
      const audioFeatsData: TrackFeatures[] = await audioFeatsRes.json();

      const averagedAudioFeats = {
        danceability: 0,
        energy: 0,
        valence: 0,
        instrumentalness: 0,
        liveness: 0,
        loudness: 0,
        speechiness: 0,
      };
      audioFeatsData.forEach((record) => {
        averagedAudioFeats.danceability += record.danceability;
        averagedAudioFeats.energy += record.energy;
        averagedAudioFeats.valence += record.valence;
        averagedAudioFeats.instrumentalness += record.instrumentalness;
        averagedAudioFeats.liveness += record.liveness;
        averagedAudioFeats.loudness += record.loudness;
        averagedAudioFeats.speechiness += record.speechiness;
      });
      // Divide by length to get averages
      Object.keys(averagedAudioFeats).forEach((key) => {
        averagedAudioFeats[key as keyof typeof averagedAudioFeats] =
          Math.round(
            (averagedAudioFeats[key as keyof typeof averagedAudioFeats] /
              audioFeatsData.length) *
              100
          ) / 100;
      });

      const messages = await createInsight(averagedAudioFeats, audioFeatsData)


      setAudioData({
        features: audioFeatsData,
        averages: averagedAudioFeats,
        insightMessages: {...messages}
      });
      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching audio feats");
      setIsLoading(false);
      console.log(e);
    }
  }, []);

  return {
    fetchTopItems,
    fetchProfile,
    fetchAudioFeats,
    user,
    topArtists,
    topTracks,
    audioData,
    isLoading,
    error,
  };
};
