"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0fefbf",
  },
} satisfies ChartConfig;

interface AudioFeatureRadarChartProps {
  audioAverages: Record<string, number>;
}

export function AudioFeatureRadarChart({
  audioAverages,
}: AudioFeatureRadarChartProps) {
  const radarData = Object.entries(audioAverages).map(([key, value]) => {
    const cleaned = key.replace("total", "");
    return {
      name: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
      value,
    };
  });

  return (
    <div className="flex flex-col w-1/3 h-full justify-center ">
      <h1 className="text-3xl text-white p-3 font-semibold">
        Averaged Audio Features and Insights
      </h1>
      <CardContent className="flex justify-center align-middle h-full w-full ">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <RadarChart data={radarData} className="">
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-(--color-desktop) opacity-15"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="name" />
            <Radar dataKey="value" fill="#1bc79f" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
