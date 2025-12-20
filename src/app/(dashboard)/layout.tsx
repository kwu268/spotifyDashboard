"use client";
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { Session } from "next-auth"; // Import the session type if needed
import { useEffect, useState, useRef } from "react";
import { spotifyUser, spotifyArtist, spotifyTrack } from "@/types/spotify";
import { Sidebar, TimeFilter, RefreshButton } from "../../components/shared";
import { LoadingView } from "@/components/LoadingView";
import { Toaster } from "sonner";


interface DashboardViewProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardViewProps) {
  const [user, setUser] = useState<spotifyUser | undefined>(undefined);
  const [topArtists, setTopArtists] = useState<spotifyArtist[]>([])
  const [topTracks, setTopTracks] = useState<spotifyTrack[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>("2025");
  const { data: session } = useSession();
  const isProfileFetchedRef = useRef(false);

  useEffect(() => {
    if (!session || isProfileFetchedRef.current) return;
    isProfileFetchedRef.current = true;

    const fetchProfile = async () => {
      setIsLoading(true);
      const res = await fetch("/api/spotify/userProfile");
      const data = await res.json();
      setUser(data);
      setIsLoading(false);
      console.log(data);
    };


    console.log('test')
    fetchProfile();
  }, [session]);

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/concert.png')]">
      {isLoading ? (
        <LoadingView isLoading={isLoading} />
      ) : (
        <div className="flex px-5 py-5 gap-3 min-h-screen animate-fadeIn">
          {/* Left Nav Bar */}
          <Sidebar user={user} />
          {/* Right Side Parent Div */}
          <div className=" w-full flex flex-col gap-5  rounded-2xl">
            {/* Top Timeline Filter Bar */}
            <RefreshButton/>

            {/* Main Content */}
            <div className=" h-full rounded-2xl bg-gradient-transparent p-3 animate-fadeIn">
              {children}
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
