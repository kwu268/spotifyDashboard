// src/components/DashboardView.tsx

'use client';
import { SignOutButton } from '@/app/components/auth/SignOutButtton'; // Alias or relative path
import { Session } from 'next-auth'; // Import the session type if needed

// We define a simple type for the session prop
interface DashboardViewProps {
    session: Session;
}

export function DashboardView({ session }: DashboardViewProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
            <div className="p-8 rounded-lg shadow-2xl bg-gray-800 text-center">
                <h1 className="text-4xl font-bold text-green-400 mb-4">
                    Welcome, {session.user?.name}!
                </h1>
                <p className="text-gray-300 mb-8">
                    You are successfully logged in and authenticated with Spotify.
                </p>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        Access Token is ready for API calls.
                    </p>
                    <SignOutButton />
                </div>
            </div>
        </main>
    );
}