"use client";

import { useState } from "react";


interface TimeFilterProps {
  selectedTopLimit: number;
  setSelectedTopLimit: (filter: number) => void;
}

interface TopFilter {
  id: number;
  label: string;
}

export function TimeFilter({ selectedTopLimit, setSelectedTopLimit }: TimeFilterProps) {

  const timeFilters: TopFilter[] = [
    {
      id: 100,
      label: "Top 100",
    },
    {
      id: 50,
      label: "Top 50",
    },
    {
      id: 10,
      label: "Top 10",
    },
  ];

  return (
    <div
      className="w-5/6 h-10 rounded-2xl flex justify-end gap-6 "
    >
      <div className=" w-1/3 flex rounded-3xl gap-1 justify-around">
        {timeFilters.map((time) => {
          return (
            <button
              key={time.id}
              className={`
                w-1/4
                hover:opacity-80
                ${
                  selectedTopLimit === time.id
                    ? "text-white font-semibold  rounded-2xl"
                    : "text-white/50"
                }
              `}
              onClick={() => setSelectedTopLimit(time.id)}
            >
              {time.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
