'use client';

import { useState } from 'react';
import { IconWeight } from '@phosphor-icons/react';

interface SidebarButtonProps {
  icon: React.ComponentType<{ color: string; weight: IconWeight; size: number, className: string }>;
  label: string;
}

export function SidebarButton({ icon: IconComponent, label }: SidebarButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex justify-center w-full items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconComponent
        color="#FFFFFF"
        weight={isHovered ? "bold" : "regular"}
        size={37}
        className="w-1/2 justify-items-start"
      />
      <button
        className={`w-full text-white text-left ${isHovered ? 'font-bold' : 'font-medium'}`}
      >
        {label}
      </button>
    </div>
  );
}
