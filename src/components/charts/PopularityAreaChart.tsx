"use client";

import { TopTrackModel } from "@/generated/prisma/models/TopTrack";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeFilter } from "../shared";
interface ChartDataPoint {
  shortName: string;
  fullName: string;
  artist: string;
  popularity: number;
  rank: number;
}

interface TooltipPayloadItem {
  chartType: undefined;
  color: string;
  dataKey: string;
  fill: string;
  fillOpacity: number;
  formatter: undefined;
  hide: boolean;
  name: string;
  payload: ChartDataPoint;
  stroke: string;
  strokeWidth: number;
  type: undefined;
  unit: undefined;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

interface PopularityAreaChartProps {
  tracks: TopTrackModel[];
  onTrackClick?: (trackIndex: number) => void;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/80 p-3 rounded border border-white/40">
        <div className="flex flex-col ">
          <p className="text-white text-xl font-semibold">{data.fullName}</p>
          <p className="text-white/70 ">{data.artist}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <p className="text-teal-300 font-semibold">Popularity score: </p>
          <p className="text-white font-semibold">{data.popularity}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-teal-300 font-semibold">Rank: </p>
          <p className="text-white font-semibold">{data.rank}</p>
        </div>
      </div>
    );
  }
  return null;
};

export function PopularityAreaChart({ tracks, onTrackClick }: PopularityAreaChartProps) {
  const [selectedTopLimit, setSelectedTopLimit] = useState<number>(100);

  if (!tracks || tracks.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/50">
        No data available
      </div>
    );
  }
  

  const data = tracks.slice(0, selectedTopLimit).map((track) => ({
    shortName:
      track.title.length > 12
        ? track.title.substring(0, 10) + ".."
        : track.title,
    fullName: track.title,
    artist: track.artist,
    popularity: track.popularity,
    rank: track.rank,
  }));

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div
        className=" flex
      text-white text-lg font-semibold mb-4 items-center "
      >
        <h2 className="w-1/2 text-2xl">Top Tracks Popularity Distribution</h2>
        <TimeFilter
          selectedTopLimit={selectedTopLimit}
          setSelectedTopLimit={setSelectedTopLimit}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onClick={(state) => {
            if (state && state.activeTooltipIndex !== undefined && onTrackClick) {
              onTrackClick(state.activeTooltipIndex);
            }
          }}
        >
          <defs>
            <linearGradient id="colorPopularity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#45437c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis
            dataKey="shortName"
            stroke="#17a11a5f"
            tick={{ fontSize: 12, fill: "#ffffff80" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#1b96555f"
            tick={{ fontSize: 12, fill: "#ffffff80" }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="popularity"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPopularity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
