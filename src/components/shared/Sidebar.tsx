"use client";

import {
  PuzzlePieceIcon,
  CoffeeIcon,
  ChartBarIcon,
  SignOutIcon,
  IconWeight,
} from "@phosphor-icons/react";
import { spotifyUser } from "@/types/spotify";
import { SignOutButton } from "@/components/auth/SignOutButtton";
import { SidebarButton } from "./SidebarButton";
import { useState } from "react";

interface SidebarProps {
  user: spotifyUser | undefined;
}

interface SidebarValues {
  icon: React.ComponentType<{
    color: string;
    weight: IconWeight;
    size: number;
    className: string;
  }>;
  label: string;
  endpoint: string
}

export function Sidebar({ user }: SidebarProps) {
  const [tabHovered, setTabHovered] = useState<string | undefined>(undefined);

  const sidebarButtonFilters: SidebarValues[] = [
    {
      icon: PuzzlePieceIcon,
      label: "Overview",
      endpoint: '/overview'
    },
    {
      icon: CoffeeIcon,
      label: "Habits",
      endpoint: '/habits'
    },
    {
      icon: ChartBarIcon,
      label: "Statistics",
      endpoint: 'statistics'
    },
  ];

  return (
    <div className=" w-1/8 rounded-2xl bg-gradient-transparent flex flex-col gap-4 ">
      <div className=" flex justify-center pt-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user?.images[0].url}
          alt="user profile"
          className="rounded-full p-2 bg-white/10  w-3/4"
        />
      </div>
      <p
        className="
        text-white
          text-center
          font-bold
          text-xl
        "
      >
        {user?.display_name}
      </p>
      <div className="border border-white w-5/6 mx-auto"></div>

      <div className=" h-full flex flex-col">
        <div className="h-1/2  flex flex-col gap-5">
          {sidebarButtonFilters.map((button) => {
            return (
              <SidebarButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                endpoint={button.endpoint}
                tabHovered={tabHovered!}
                setTabHovered={setTabHovered}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-auto flex-col items-center ">
          <div className="flex justify-start w-full items-center mt-auto py-2 ">
            <SignOutButton />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className=" w-1/2 py-4"
            src={`/images/logo.png`}
            alt="spotify logo"
          />
        </div>
      </div>
    </div>
  );
}
