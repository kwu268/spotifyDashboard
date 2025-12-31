"use client";

import { createContext } from "react";
import type { TopArtistModel } from "@/generated/prisma/models/TopArtist";
import type { TopTrackModel } from "@/generated/prisma/models/TopTrack";
import type { TrackFeatures } from "../../../../generated/prisma/models/TrackFeatures";

export const TopArtistsContext = createContext<TopArtistModel[]>([]);
export const TopTracksContext = createContext<TopTrackModel[]>([]);
export const AudioFeatsContext = createContext<{
  features: TrackFeatures[];
  averages: Record<string, number>;
  insightMessages: {
    insights: Record<string, string>[];
  };
}>({
  features: [],
  averages: {},
  insightMessages: { insights: [] }
});
