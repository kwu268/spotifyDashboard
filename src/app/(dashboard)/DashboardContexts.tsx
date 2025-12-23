"use client";

import { createContext } from "react";
import type { TopArtistModel } from "@/generated/prisma/models/TopArtist";
import type { TopTrackModel } from "@/generated/prisma/models/TopTrack";
import { spotifyTrack } from "@/types/spotify";

type TrackInfoMap = Record<string, spotifyTrack>;

export const TopArtistsContext = createContext<TopArtistModel[]>([]);
export const TopTracksContext = createContext<TopTrackModel[]>([]);
export const TopTrackInfoContext = createContext<TrackInfoMap>({});
