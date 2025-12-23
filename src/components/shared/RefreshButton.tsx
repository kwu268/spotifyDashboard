"use client";

import { useState } from "react";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

interface RefreshButtonProps {

  onSyncFunction: () => void;
}

export function RefreshButton({onSyncFunction}: RefreshButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const syncDataRequest = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetch("/api/spotify/syncTopItems", { method: "POST" });
      const data = await res.json();
      setIsLoading(false);
      console.log(data);
      onSyncFunction()
      return data.message;
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <button
      className={`h-14 rounded-2xl flex items-center gap-2 transition-all duration-300 overflow-hidden ml-auto ${
        isLoading
          ? "w-auto px-6 bg-black/40"
          : isHovered
          ? "w-auto px-4 bg-green-950/80"
          : "w-14 justify-center bg-black/70"
      }`}
      onMouseEnter={() => !isLoading && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={async () => {
        setIsLoading(true);
        toast.promise(syncDataRequest(), {
          loading: "Syncing your top artists and tracks...",
          success: (data) => {
            setIsLoading(false);
            return data || "Sync complete!";
          },
          error: (err) => {
            setIsLoading(false);
            console.log(err.message)
            return "Failed to sync data";
          },
        });
      }}
      disabled={isLoading}
    >
      {!isLoading && (
        <ArrowClockwiseIcon
          color="#FFFFFF"
          weight={"regular"}
          size={32}
          className="shrink-0"
        />
      )}

      <p
        className={`whitespace-nowrap transition-opacity duration-300 text-white font-semibold ${
          isLoading
            ? "opacity-100"
            : isHovered
            ? "opacity-100"
            : "opacity-0 w-0"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-1">
            Syncing
            <span className="inline-flex">
              <span className="animate-pulse" style={{ animationDelay: "0ms" }}>
                .
              </span>
              <span className="animate-pulse" style={{ animationDelay: "200ms" }}>
                .
              </span>
              <span className="animate-pulse" style={{ animationDelay: "400ms" }}>
                .
              </span>
            </span>
          </span>
        ) : (
          "Sync Top Items"
        )}
      </p>
    </button>
  );
}
