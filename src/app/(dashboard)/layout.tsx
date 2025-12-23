"use client";
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { TopArtistsContext, TopTracksContext, TopTrackInfoContext } from "./DashboardContexts";
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
    topTracskInfo,
    error,
  } = useFetchDashboard();
  const { data: session } = useSession();
  const isProfileFetchedRef = useRef(false);

  useEffect(() => {
    if (!session || isProfileFetchedRef.current) return;
    isProfileFetchedRef.current = true;

    fetchProfile();
    fetchTopItems();

  }, [session]);

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/concert.png')]">
      {isLoading || !topArtists || !topTracks || !topTracskInfo ? (
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
                  <TopTrackInfoContext value={topTracskInfo}>

                  {children}
                  </TopTrackInfoContext>
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
// <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
//   <div className="p-8 rounded-lg shadow-2xl bg-gray-800 text-center">
//     <h1 className="text-4xl font-bold text-green-400 mb-4">
//       Welcome, {session.user?.name}!
//     </h1>
//     <p className="text-gray-300 mb-8">
//       You are successfully logged in and authenticated with Spotify.
//     </p>
//     <div className="space-y-4">
//       <p className="text-sm text-gray-500">
//         Access Token is ready for API calls.
//       </p>
//       <SignOutButton />
//     </div>
//   </div>
// </main>
