'use client';
import { SignInButton } from '@/components/auth/SignInButton';
import { useSession } from 'next-auth/react';
import { DashboardView } from '@/components/DashboardView';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-white text-xl">Loading session...</div>;
  }

  if (session) {
    return <DashboardView session={session} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Spotify Dashboard Analytics</h1>

      {/* This is where your user will see the login option.
        Later, we'll wrap this in a check to only show it when they're logged out.
      */}
      <SignInButton />

      <p className="mt-4 text-gray-400">Please log in to view your personalized data.</p>
    </main>
  );
}