// ~~~ Shared Related ~~~

export interface spotifyImage {
	url: string;
  height: number;
  width: number;
}

export interface SpotifyPaginatedResponse<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  previous: string | null;
  total: number;
  offset: number;
}


// ~~~ Playlist Related ~~~

export interface spotifyPlaylistOwner {
  id: string;
  display_name: string;
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
}

export interface spotifyPlaylistTracks {
  href: string;
  total: number;
}

export interface spotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: spotifyImage[];
  type: string; // "playlist"
  uri: string;
  href: string;
  collaborative: boolean;
  public: boolean;
  primary_color: string | null;
  snapshot_id: string;
  owner: spotifyPlaylistOwner;
  tracks: spotifyPlaylistTracks;
  external_urls: {
    spotify: string;
  };
}

// ~~~ User Relatted ~~~
export interface spotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: spotifyImage[];
  country: string;
  product: string; // "premium" or "free"
  type: string; // "user"
  uri: string;
  href: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
}

// ~~~ Album Related ~~~

export interface spotifyArtist {
  id: string;
  name: string;
  type: string; // "artist"
  uri: string;
  href: string;
  popularity: number;
  genres: string[];
  images: spotifyImage[];
  followers: {
    href: string | null;
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

export interface spotifyCopyright {
  text: string;
  type: string; // "C" or "P"
}

export interface spotifyAlbumTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface spotifyAlbum {
  id: string;
  name: string;
  album_type: string; // "album", "single", "compilation"
  type: string; // "album"
  uri: string;
  href: string;
  images: spotifyImage[];
  artists: spotifyArtist[];
  release_date: string;
  release_date_precision: string; // "year", "month", "day"
  total_tracks: number;
  popularity: number;
  label: string;
  genres: string[];
  copyrights: spotifyCopyright[];
  available_markets: string[];
  external_ids: {
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  tracks: spotifyAlbumTracks;
}

export interface spotifySavedAlbum {
  added_at: string;
  album: spotifyAlbum;
}

// ~~~ Track Related ~~~

export interface spotifyTrack {
  id: string;
  name: string;
  type: string; // "track"
  uri: string;
  href: string;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  is_local: boolean;
  is_playable: boolean;
  popularity: number;
  preview_url: string | null;
  album: spotifyAlbum;
  artists: spotifyArtist[];
  available_markets: string[];
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
}

export interface spotifyPlayContext {
  type: string; // "playlist", "album", "artist"
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}

export interface spotifyPlayHistory {
  played_at: string;
  context: spotifyPlayContext | null;
  track: spotifyTrack;
}