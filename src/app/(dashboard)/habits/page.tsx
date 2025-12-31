"use client";
import { AudioFeatureRadarChart } from "@/components/charts/AudioFeatureRadarChart";
import { PopularityAreaChart } from "@/components/charts/PopularityAreaChart";
import { HabitStatCard } from "@/components/shared/HabitStatCard";
import { InsightComment } from "@/components/shared/InsightComment";
import { useContext, useState } from "react";
import { AudioFeatsContext } from "../DashboardContexts";
import {
  DiscoBallIcon,
  LightningIcon,
  HeartbeatIcon,
  GuitarIcon,
  RadioIcon,
  SpeakerHighIcon,
  ChatCircleDotsIcon,
  DiceOneIcon,
  DiceTwoIcon,
  DiceThreeIcon,
  DiceFourIcon,
} from "@phosphor-icons/react";

export default function HabitsPage() {
  const audioFeatsData = useContext(AudioFeatsContext);
  const [tabHovered, setTabHovered] = useState<string | undefined>(undefined);

  console.log("tester: ", audioFeatsData);

  // random screen for now
  return (
    <div className="flex flex-col h-full animate-fadeIn gap-3">
      <div className=" w-full h-3/5 rounded-2xl bg-gradient-transparent  flex ">
        <AudioFeatureRadarChart audioAverages={audioFeatsData.averages} />
        <div className="h-full w-2/3 flex flex-col  gap-3 p-6">
          {/* Top row - 3 items centered */}
          <div className="w-full grid grid-cols-8 gap-3 p-2 h-1/2">
            <div className="h-full"></div>
            <HabitStatCard
              icon={<DiscoBallIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.danceability}
              description="Danceability"
              top={true}
              gradientFrom="from-pink-500"
              gradientTo="to-rose-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <HabitStatCard
              icon={<LightningIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.energy}
              description="Energy"
              top={true}
              gradientFrom="from-orange-500"
              gradientTo="to-amber-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <HabitStatCard
              icon={<HeartbeatIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.valence}
              description="Valence"
              top={true}
              gradientFrom="from-yellow-400"
              gradientTo="to-lime-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <div className="h-full "></div>
          </div>
          {/* Bottom row - 4 items */}
          <div className="w-full grid grid-cols-4 gap-3 p-2  h-1/2">
            <HabitStatCard
              icon={<GuitarIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.instrumentalness}
              description="Instrumental"
              top={false}
              gradientFrom="from-cyan-500"
              gradientTo="to-blue-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <HabitStatCard
              icon={<RadioIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.liveness}
              description="Liveness"
              top={false}
              gradientFrom="from-purple-500"
              gradientTo="to-indigo-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <HabitStatCard
              icon={<SpeakerHighIcon color="white" size={40} weight="bold" />}
              value={audioFeatsData.averages.loudness}
              description="Loudness"
              top={false}
              gradientFrom="from-red-500"
              gradientTo="to-pink-600"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
            <HabitStatCard
              icon={
                <ChatCircleDotsIcon color="white" size={40} weight="bold" />
              }
              value={audioFeatsData.averages.speechiness}
              description="Speechiness"
              top={false}
              gradientFrom="from-emerald-500"
              gradientTo="to-teal-500"
              tabHovered={tabHovered!}
              setTabHovered={setTabHovered}
            />
          </div>
        </div>
      </div>
      <div className=" w-full h-1/2 rounded-2xl bg-gradient-transparent grid grid-cols-2 gap-3">
        <InsightComment
          icon={<DiceOneIcon size={24} weight="bold" />}
          title={audioFeatsData.insightMessages.insights[0]?.title || ""}
          content={audioFeatsData.insightMessages.insights[0]?.content || ""}
          colour="#ec4899"
        />
        <InsightComment
          icon={<DiceTwoIcon size={24} weight="bold" />}
          title={audioFeatsData.insightMessages.insights[1]?.title || ""}
          content={audioFeatsData.insightMessages.insights[1]?.content || ""}
          colour="#f97316"
        />
        <InsightComment
          icon={<DiceThreeIcon size={24} weight="bold" />}
          title={audioFeatsData.insightMessages.insights[2]?.title || ""}
          content={audioFeatsData.insightMessages.insights[2]?.content || ""}
          colour="#eab308"
        />
        <InsightComment
          icon={<DiceFourIcon size={24} weight="bold" />}
          title={audioFeatsData.insightMessages.insights[3]?.title || ""}
          content={audioFeatsData.insightMessages.insights[3]?.content || ""}
          colour="#10b981"
        />
      </div>
    </div>
  );
}
