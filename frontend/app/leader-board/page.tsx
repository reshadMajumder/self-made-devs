"use client";

import React, { useEffect, useState } from "react";

type Leader = {
  full_name: string;
  email: string;
  points: number;
};

export default function LeaderBoardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Leaderboard backend may be disabled; avoid fetching to prevent errors.
    setLoading(false);
    setError(null);
    // Intentionally not calling the leaderboard API.
    return undefined;
  }, []);

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl mt-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Leader Board</h1>

        {loading && <p className="text-center text-slate-400">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error loading leaderboard: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-center">
                  <th className="px-4 py-2 border-b">Rank</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  {/* <th className="px-4 py-2 border-b">Email</th> */}
                  <th className="px-4 py-2 border-b">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No leaderboard data yet.
                    </td>
                  </tr>
                )}
                {leaders.map((l, idx) => (
                  <tr key={l.email} className="odd:bg-white even:bg-slate-50 ">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{l.full_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {l.email}
                    </td>
                    <td className="px-4 py-3 font-medium">{l.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
