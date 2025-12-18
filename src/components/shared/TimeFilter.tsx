"use client";

import { useState } from "react";


interface TimeFilterProps {
  selectedTime: string;
  setSelectedTime: (filter: string) => void;
}

interface TimeFilter {
  id: string;
  label: string;
}

export function TimeFilter({ selectedTime, setSelectedTime }: TimeFilterProps) {

  const timeFilters: TimeFilter[] = [
    {
      id: "2023",
      label: "2023",
    },
    {
      id: "2024",
      label: "2024",
    },
    {
      id: "2025",
      label: "2025",
    },
  ];

  return (
    <div
      className=" h-14 rounded-2xl flex justify-end gap-6"
    >
      <div className="border-2 w-1/4 bg-black/70 flex rounded-3xl gap-3 justify-around">
        {timeFilters.map((time) => {
          return (
            <button
              key={time.id}
              className={`
                w-1/4
                hover:opacity-80
                ${
                  selectedTime === time.id
                    ? "text-white font-semibold  rounded-2xl"
                    : "text-white/50"
                }
              `}
              onClick={() => setSelectedTime(time.id)}
            >
              {time.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
