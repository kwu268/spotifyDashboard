import {
  spotifyUser,
  SpotifyPaginatedResponse,
  spotifyPlaylist,
  spotifySavedAlbum,
  spotifyPlayHistory,
  spotifyArtist,
  spotifyTrack
} from "@/types/spotify";

const baseUrl = process.env.SPOTIFY_API_URL;

export const getUserProfile = async (
  accessToken: string
): Promise<spotifyUser> => {
  try {
    const userResponse = await fetch(baseUrl!, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed getting response from Spotify User API");
    }
    const userData = await userResponse.json();
    return userData;
  } catch (e) {
    console.log("Something went wrong with Spotify User API Error: ", e);
    throw e;
  }
};

export const getUserPlaylists = async (
  accessToken: string,
  limit: number = 50,
  offset: number = 0
): Promise<SpotifyPaginatedResponse<spotifyPlaylist>> => {
  // TO-DO: Logic for adding # limit on returned playlists
  try {
    const userResponse = await fetch(
      `${baseUrl}${process.env.SPOTIFY_USER_PLAYLISTS_ENDPOINT}?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed getting response from Spotify Playlist API");
    }
    const userData = await userResponse.json();
    return userData;
  } catch (e) {
    console.log("Something went wrong with Spotify Playlist API Error: ", e);
    throw e;
  }
};

export const getUserAlbums = async (
  accessToken: string
): Promise<SpotifyPaginatedResponse<spotifySavedAlbum>> => {
  try {
    const userResponse = await fetch(
      `${baseUrl}${process.env.SPOTIFY_USER_ALBUMS_ENDPOINT}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      console.log(userResponse);
      throw new Error("Failed getting response from Spotify Album API");
    }
    const userData = await userResponse.json();
    return userData;
  } catch (e) {
    console.log("Something went wrong with Spotify User Album Error: ", e);
    throw e;
  }
};

export const getUserRecentlyPlayed = async (
  accessToken: string
): Promise<SpotifyPaginatedResponse<spotifyPlayHistory>> => {
  try {
    const userResponse = await fetch(
      `${baseUrl}${process.env.SPOTIFY_RECENTLY_PLAYED_ENDPOINT}?limit=50`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(
        "Failed getting response from Spotify RecentlyPlayed API"
      );
    }
    const userData = await userResponse.json();
    return userData;
  } catch (e) {
    console.log(
      "Something went wrong with Spotify RecentlyPlayed API Error: ",
      e
    );
    throw e;
  }
};

export const getUserTop = async (
  accessToken: string,
  topType: string,
  range: string | null,
  offset: number
): Promise<SpotifyPaginatedResponse<spotifyArtist | spotifyTrack>> => {
  try {
    const finalRange = range ?? "medium_term";
    const endpoints: Record<string, string> = {
      artists: `${baseUrl}${process.env.SPOTIFY_TOP_ARTISTS_ENDPOINT}`,
      tracks: `${baseUrl}${process.env.SPOTIFY_TOP_TRACKS_ENDPOINT}`,
    };
    const fullUrl = endpoints[topType];
    if (!fullUrl)
      throw new Error(
        `Spotify Top API Error: Invalid topType value: ${topType}`
      );

    const userResponse = await fetch(
      `${fullUrl}?time_range=${finalRange}&limit=50&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      console.log(userResponse)
      throw new Error("Failed getting response from Spotify Top API");
    }
    const userData = await userResponse.json();
    return userData;
  } catch (e) {
    console.log("Something went wrong with Spotify User API Error: ", e);
    throw e;
  }
};
