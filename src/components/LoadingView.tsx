"use client";

interface LoadingViewProps {
  isLoading: boolean | undefined;
}

export function LoadingView({ isLoading }: LoadingViewProps) {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-transparent `}
    >
      <div className="flex flex-col items-center gap-4 relative">
        <div className="w-52 h-52 bottom-9 border-3 border-green-600 border-t-green-500 rounded-full animate-spin flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full remove-black bg-green-400 rounded-full animate-spin-reverse "
            src={`/images/icon.svg`}
            alt="spotify logo"
          />
        </div>
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );
}
