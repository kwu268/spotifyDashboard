"use client";
import { useContext, useState } from "react";
import {
  TopArtistsContext,
  TopTracksContext,
} from "../DashboardContexts";
import { GaugeIcon, PaletteIcon, TrendUpIcon } from "@phosphor-icons/react";
import { StatCard } from "@/components/shared/StatCard";
import { PopularityAreaChart } from "@/components/charts/PopularityAreaChart";
import {
  averagePopularity,
  popularityRange,
  uniqueGenere,
} from "@/lib/overviewFunctions";


import { analyzeSentiment } from "@/lib/claude/analyzeSentiment";


export default function OverviewPage() {
  const topArtistArrray = useContext(TopArtistsContext);
  const topTracksArray = useContext(TopTracksContext);
  console.log('test: ', topTracksArray)

  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  const handleTrackClick = (trackIndex: number) => {
    setSelectedTrackIndex(trackIndex);
  };


  return (
    <div className="w-full h-full  flex gap-3 ">
      <div className="h-full w-3/4 flex flex-col gap-3  animate-fadein">
        <div className="h-1/4 grid grid-cols-3 gap-3">
          <StatCard
            icon={<TrendUpIcon color="white" size={40} weight="bold" />}
            title="Average Popularity"
            subValue="Score of"
            value={averagePopularity(topTracksArray)}
            gradientFrom="from-pink-500"
            gradientTo="to-purple-800"
            tooltip={true}
          />
          <StatCard
            icon={<PaletteIcon color="white" size={40} weight="bold" />}
            title="Unique Number Genres"
            subValue="Listened to is..."
            value={uniqueGenere(topArtistArrray)}
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
          />
          <StatCard
            icon={<GaugeIcon color="white" size={40} weight="bold" />}
            title="Popularity Range"
            subValue="Range of"
            value={popularityRange(topTracksArray)}
            gradientFrom="from-green-500"
            gradientTo="to-emerald-600"
          />
        </div>
        <div className="h-3/4 bg-gradient-transparent rounded-xl ">
          {topTracksArray && (
            <PopularityAreaChart
              tracks={topTracksArray}
              onTrackClick={handleTrackClick}
            />
          )}
        </div>
      </div>
      <div className="h-full  w-1/4 bg-gradient-transparent rounded-xl overflow-auto">
        <div className=" flex flex-col m-3 rounded-2xl text-white gap-4">
          <h1 className=" rounded-xl text-lg font-bold text-white p-2">
            Chart Selected Track
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className=" rounded-3xl  px-10"
            src={
              topTracksArray?.[selectedTrackIndex]?.albumImageUrl ??
              "/images/defaultCover.png"
            }
            alt="album cover"
          />
          <div>
            <h2 className="text-2xl font-bold overflow-auto">
              {topTracksArray?.[selectedTrackIndex]?.title ?? "N/A"}
            </h2>
            <h2 className="text-white/60">
              {topTracksArray?.[selectedTrackIndex]?.artist ?? "N/A"}
            </h2>
          </div>
          <div className="border border-white w-full mx-auto"></div>
          <div>
            <h2 className="font-bold text-2xl overflow-auto">
              {(topTracksArray?.[selectedTrackIndex]?.trackInfo as any)?.album.name ??
                "N/A"}
            </h2>
            <h2 className="text-white/60">Album name</h2>
          </div>
          <div className="border border-white w-full mx-auto overflow-auto"></div>
          <div>
            <h2 className="font-bold text-2xl">
              {topTracksArray?.[selectedTrackIndex]?.popularity ?? "N/A"}
            </h2>
            <h2 className="text-white/60">Popularity Score</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
