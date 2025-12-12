// src/components/auth/SignOutButton.tsx

'use client';
import { signOut } from "next-auth/react";

export function SignOutButton() {

    const handleSignOut = () => {
        // Sign out and redirect the user back to the homepage
        signOut({ callbackUrl: '/' });
    };

    return (
        <button
            onClick={handleSignOut}
            className="
                bg-red-500 hover:bg-red-600 
                text-white font-semibold 
                py-2 px-4 
                rounded-md 
                shadow-lg 
                transition duration-300 ease-in-out
            "
        >
            Sign Out
        </button>
    );
}