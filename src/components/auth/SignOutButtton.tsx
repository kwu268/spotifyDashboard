"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { SignOutIcon } from "@phosphor-icons/react";

export function SignOutButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div
      className="flex justify-start w-full items-center mt-auto py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SignOutIcon
        color="#FFFFFF"
        className="justify-items-start w-1/3"
        size={37}
        weight={isHovered ? "bold" : "regular"}
      />
      <button
        onClick={handleSignOut}
        className={`
          w-1/2 text-white  text-left
          shadow-lg
          transition duration-300 ease-in-out
          ${isHovered ? "font-bold" : "font-medium"}
  `}
      >
        Sign Out
      </button>
    </div>
  );
}
