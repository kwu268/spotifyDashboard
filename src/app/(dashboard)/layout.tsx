"use client";
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { TopArtistsContext, TopTracksContext } from "./DashboardContexts";
import { Sidebar, RefreshButton } from "../../components/shared";
import { LoadingView } from "@/components/LoadingView";
import { Toaster } from "sonner";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";

interface DashboardViewProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardViewProps) {
  const {
    fetchTopItems,
    fetchProfile,
    user,
    topArtists,
    topTracks,
    isLoading,
    error,
  } = useFetchDashboard();
  const { data: session } = useSession();
  const isProfileFetchedRef = useRef(false);

  useEffect(() => {
    if (!session || isProfileFetchedRef.current) return;
    isProfileFetchedRef.current = true;

    fetchProfile();
    fetchTopItems();

  }, [session, fetchProfile, fetchTopItems]);

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/concert.png')]">
      {isLoading || topArtists.length === 0 || topTracks.length === 0 ? (
        <LoadingView isLoading={isLoading} />
      ) : (
        <div className="flex px-5 py-5 gap-3 min-h-screen animate-fadeIn">
          {/* Left Nav Bar */}
          <Sidebar user={user} />
          {/* Right Side Parent Div */}
          <div className=" w-full flex flex-col gap-5  rounded-2xl">
            {/* Top Timeline Filter Bar */}
            <RefreshButton onSyncFunction={fetchTopItems}/>

            {/* Main Content */}
            <div className=" flex-1 rounded-2xl animate-fadeIn">
              <TopArtistsContext.Provider value={topArtists}>
                <TopTracksContext.Provider value={topTracks}>

                  {children}
                </TopTracksContext.Provider>
              </TopArtistsContext.Provider>
              <Toaster />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
