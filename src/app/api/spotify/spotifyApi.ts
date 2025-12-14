const baseUrl = process.env.SPOTIFY_API_URL;

export const getUserProfile = async (accessToken: string) => {
  try {
    const userResponse = await fetch(baseUrl!, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed getting response from Spotify User API')
    }
    const userData = await userResponse.json()
    return userData
  } catch (e) {
    console.log('Something went wrong with Spotify User API Error: ', e)
  }
};

export const getUserPlaylists = async (accessToken: string) => {
  // TO-DO: Logic for adding # limit on returned playlists
  try {
    const userResponse = await fetch(`${baseUrl}${process.env.SPOTIFY_USER_PLAYLISTS_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed getting response from Spotify Playlist API')
    }
    const userData = await userResponse.json()
    return userData
  } catch (e) {
    console.log('Something went wrong with Spotify Playlist API Error: ', e)
  }
};

export const getUserAlbums = async (accessToken: string) => {
  try {
    const userResponse = await fetch(`${baseUrl}${process.env.SPOTIFY_USER_ALBUMS_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed getting response from Spotify Album API')
    }
    const userData = await userResponse.json()
    return userData
  } catch (e) {
    console.log('Something went wrong with Spotify User Album Error: ', e)
  }
};

export const getUserRecentlyPlayed = async (accessToken: string) => {
  try {
    const userResponse = await fetch(`${baseUrl}${process.env.SPOTIFY_USER_ALBUMS_ENDPOINT}?limit=50`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed getting response from Spotify RecentlyPlayed API')
    }
    const userData = await userResponse.json()
    return userData
  } catch (e) {
    console.log('Something went wrong with Spotify RecentlyPlayed API Error: ', e)
  }
};

export const getUserTop = async (accessToken: string, topType: string, range: string = "medium_term") => {
  try {

    const endpoints: Record<string, string> = {
      artists: `${baseUrl}${process.env.SPOTIFY_TOP_ARTISTS_ENDPOINT}`,
      tracks: `${baseUrl}${process.env.SPOTIFY_TOP_TRACKS_ENDPOINT}`
    }
    const fullUrl = endpoints[topType]
    if (!fullUrl) throw new Error(`Spotify Top API Error: Invalid topType value: ${topType}`)

    const userResponse = await fetch(`${fullUrl}?time_range=${range}&limit=50`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed getting response from Spotify Top API')
    }
    const userData = await userResponse.json()
    return userData
  } catch (e) {
    console.log('Something went wrong with Spotify User API Error: ', e)
  }
};
