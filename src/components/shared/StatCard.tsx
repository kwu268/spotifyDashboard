import { ReactNode } from "react";
import { spotifyTrack, spotifyArtist } from "@/types/spotify"

interface StatCardProps {
  icon: ReactNode;
  title: string;
  subValue: string | number;
  value: string | number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function StatCard({
  icon,
  title,
  subValue,
  value,
  gradientFrom,
  gradientTo,
}: StatCardProps) {
  return (
    <div className="bg-gradient-transparent rounded-xl flex flex-col ">
      <div className="flex h-1/2 items-center gap-2 m-2 ml-4">
        <div className={`rounded-3xl bg-linear-to-r ${gradientFrom} ${gradientTo} aspect-square h-3/4 p justify-center flex items-center`}>
          {icon}
        </div>
        <h1 className="text-white font-bold text-3xl px-2 text-">{title}</h1>
        <div></div>
      </div>
      <div className="text-white mx-4 h-1/2 m-2">
        <div className=" text-lg font-semibold text-white/60">{subValue}</div>
        <div className=" text-3xl font-semibold" >{value}</div>
      </div>
    </div>
  );
}
