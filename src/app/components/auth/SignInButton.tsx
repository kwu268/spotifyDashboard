"use client"; //Everything in this file, and any components imported by this file, should be bundled and executed on the client-side (in the user's browser), not on the server

import { signIn } from "next-auth/react";
export const SignInButton = () => {
  const handleSignIn = () => {
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="
        bg-green-500 hover:bg-green-600
        text-white font-semibold
        py-3 px-6
        rounded-full
        shadow-lg
        transition duration-300 ease-in-out
        transform hover:scale-105
        "
    >
      Sign in with Spotify
    </button>
  );
};
