import { useState } from "react";
import { spotifyArtist, spotifyTrack, spotifyUser } from "@/types/spotify";

export const useFetchDashboard = () => {
  const [user, setUser] = useState<spotifyUser | undefined>(undefined);
  const [topArtists, setTopArtists] = useState<spotifyArtist[]>([]);
  const [topTracks, setTopTracks] = useState<spotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTopItems = async () => {
    try {
      console.log('fetching data')
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
  };

  const fetchProfile = async () => {
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
  };
  return {
    fetchTopItems,
    fetchProfile,
    user,
    topArtists,
    topTracks,
    isLoading,
    error,
  };
};
