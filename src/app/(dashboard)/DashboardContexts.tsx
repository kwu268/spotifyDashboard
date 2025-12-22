'use client'

import { createContext } from "react"
import { spotifyArtist, spotifyTrack } from "@/types/spotify";

export const TopArtistsContext = createContext<spotifyArtist[]>([]);
export  const TopTracksContext = createContext<spotifyTrack[]>([]);