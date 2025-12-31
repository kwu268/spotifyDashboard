"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HabitStatCardProps {
  icon: React.ReactNode;
  value: number | string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  top: boolean;
  opacity?: number;
  tabHovered: string;
  setTabHovered: (value: string | undefined) => void;
}

export function HabitStatCard({
  icon,
  value,
  description,
  top,
  gradientFrom,
  gradientTo,
  tabHovered,
  setTabHovered,
}: HabitStatCardProps) {
  return (
    <div
      className={`bg-linear-to-br ${gradientFrom} ${gradientTo} h-full  rounded-2xl flex flex-col ${
        top && "col-span-2"
      } items-center`}
      onMouseEnter={() => setTabHovered(description)}
      onMouseLeave={() => setTabHovered(undefined)}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex flex-col items-center pt-3 h-full w-full cursor-pointer">
            <div className="flex items-center justify-center flex-1  w-1/3">
              {icon}
            </div>
            <div className={`flex items-center justify-center flex-1 text-4xl text-white  ${tabHovered === description && 'font-bold'}`}>
              {value}
            </div>
            <div className={`flex items-center justify-center flex-1 text-white  text-2xl ${tabHovered === description && 'font-bold'}`}>
              {description}
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent>test</PopoverContent>
      </Popover>
    </div>
  );
}
