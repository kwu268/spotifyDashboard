'use client';

import { useState } from 'react';
import { IconWeight } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';



interface SidebarButtonProps {
  icon: React.ComponentType<{ color: string; weight: IconWeight; size: number, className: string }>;
  label: string;
  endpoint: string
  tabHovered: string;
  setTabHovered: (value: string | undefined) => void;
}

export function SidebarButton({ icon: IconComponent, label, endpoint, tabHovered, setTabHovered }: SidebarButtonProps) {
  const pathname = usePathname()


  const navigateTo = (newEndpoint: string) => {
    redirect(newEndpoint)
  }

  return (
    <div
      className="flex justify-center w-full items-center"
      onMouseEnter={() => setTabHovered(label)}
      onMouseLeave={() => setTabHovered(undefined)}

      onClick={() => navigateTo(endpoint)}
    >
      <IconComponent
        color="#FFFFFF"
        weight={tabHovered === label || pathname === endpoint ? "bold" : "regular"}
        size={37}
        className="w-1/2 justify-items-start"
      />
      <button
        className={`w-full text-white text-left ${tabHovered === label || pathname === endpoint ? 'font-bold' : 'font-medium'} `}
      >
        {label}
      </button>
    </div>
  );
}
