"use client";
import { useContext } from "react";
import { TopArtistsContext, TopTracksContext } from "../DashboardContexts";
import { GaugeIcon, PaletteIcon, TrendUpIcon } from "@phosphor-icons/react";
import { StatCard } from "@/components/shared/StatCard";
import { averagePopularity, popularityRange, uniqueGenere } from "@/lib/overviewFunctions";


export default function OverviewPage() {
  const topArtistArrray = useContext(TopArtistsContext);
  const topTracksArray = useContext(TopTracksContext);
console.log('@@')
console.log(topArtistArrray)

  return (
    <div className="w-full h-full  flex gap-3">
      <div className="h-full w-3/4 flex flex-col gap-3">
        <div className="h-1/4 grid grid-cols-3 gap-3">
          <StatCard
            icon={<TrendUpIcon color="white" size={40} weight="bold"/>}
            title="Average Popularity"
            subValue="Score of"
            value={averagePopularity(topTracksArray)}
            gradientFrom="from-pink-500"
            gradientTo="to-purple-800"
          />
          <StatCard
            icon={<PaletteIcon color="white" size={40} weight="bold"/>}
            title="Unique Number Genres"
            subValue="Listened to is..."
            value={uniqueGenere(topArtistArrray)}
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
          />
          <StatCard
            icon={<GaugeIcon color="white" size={40} weight="bold"/>}
            title="Popularity Range"
            subValue="Range of"
            value={popularityRange(topTracksArray)}
            gradientFrom="from-green-500"
            gradientTo="to-emerald-600"
          />
        </div>
        <div className="h-3/4 bg-gradient-transparent rounded-xl">Graph</div>
      </div>
      <div className="h-full border-2 w-1/4 bg-gradient-transparent rounded-xl">
        Top Track info
      </div>
    </div>
  );
}
