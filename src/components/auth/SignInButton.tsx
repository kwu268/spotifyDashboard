'use client' //Everything in this file, and any components imported by this file, should be bundled and executed on the client-side (in the user's browser), not on the server

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button onClick={() => signIn("spotify")}>
      Sign in with Spotify
    </button>
  );
}