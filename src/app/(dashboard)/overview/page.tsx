export default function OverviewPage() {
  // random screen for now
  return (
    <div className="flex flex-col gap-4 h-full animate-fadeIn">
      <h1 className="text-3xl font-bold text-white">Overview</h1>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg p-6 border border-green-500/30">
          <p className="text-green-400 text-sm font-semibold">Top Artists</p>
          <p className="text-white text-2xl font-bold mt-2">50</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg p-6 border border-blue-500/30">
          <p className="text-blue-400 text-sm font-semibold">Top Tracks</p>
          <p className="text-white text-2xl font-bold mt-2">150</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg p-6 border border-purple-500/30">
          <p className="text-purple-400 text-sm font-semibold">
            Recently Played
          </p>
          <p className="text-white text-2xl font-bold mt-2">42</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-lg p-6 border border-pink-500/30">
          <p className="text-pink-400 text-sm font-semibold">Playlists</p>
          <p className="text-white text-2xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
}
