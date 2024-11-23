"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Streak {
  Streak_ID: string;
  Current_Streak_No: number;
  Start_Date: string;
  Today_Date: string;
  Rewards_Milestone: string;
  Rewards_Details: string;
  Membership_ID: string;
}

export const Streak = () => {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [filteredStreaks, setFilteredStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    streakID: "",
    membershipID: "",
    rewardsMilestone: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Fetch streak data from the API
    const fetchStreaks = async () => {
      try {
        const response = await axios.get("/api/streak");
        setStreaks(response.data);
        setFilteredStreaks(response.data); // Initially, all data is shown
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch streaks:", err);
        setError("Failed to fetch streak data");
        setLoading(false);
      }
    };
    fetchStreaks();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    let filtered = streaks;

    if (filters.streakID) {
      filtered = filtered.filter((streak) =>
        streak.Streak_ID.toLowerCase().includes(filters.streakID.toLowerCase())
      );
    }
    if (filters.membershipID) {
      filtered = filtered.filter((streak) =>
        streak.Membership_ID.toLowerCase().includes(
          filters.membershipID.toLowerCase()
        )
      );
    }
    if (filters.rewardsMilestone) {
      filtered = filtered.filter((streak) =>
        streak.Rewards_Milestone.toLowerCase().includes(
          filters.rewardsMilestone.toLowerCase()
        )
      );
    }
    if (filters.startDate) {
      filtered = filtered.filter(
        (streak) => new Date(streak.Start_Date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (streak) => new Date(streak.Today_Date) <= new Date(filters.endDate)
      );
    }

    setFilteredStreaks(filtered);
  };

  const clearFilters = () => {
    setFilters({
      streakID: "",
      membershipID: "",
      rewardsMilestone: "",
      startDate: "",
      endDate: "",
    });
    setFilteredStreaks(streaks);
  };

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-12 p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-4xl font-semibold mb-8 border-b pb-4 text-gray-800">
          Streak Records
        </h2>

        {/* Filter Inputs */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <input
            type="text"
            value={filters.streakID}
            onChange={(e) => handleFilterChange("streakID", e.target.value)}
            placeholder="Filter by Streak ID..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={filters.membershipID}
            onChange={(e) => handleFilterChange("membershipID", e.target.value)}
            placeholder="Filter by Membership ID..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={filters.rewardsMilestone}
            onChange={(e) => handleFilterChange("rewardsMilestone", e.target.value)}
            placeholder="Filter by Rewards Milestone..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-8 justify-end">
          
          <button
            onClick={clearFilters}
            className="px-5 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Clear Filters
          </button>
          <button
            onClick={() => setFilteredStreaks(streaks)}
            className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Show All
          </button>
          <button
            onClick={applyFilters}
            className="px-5 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Apply Filters
          </button>
        </div>

        {loading ? (
          <p>Loading streak data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-md pb-6">
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-purple-500 text-white">
                  <th className="py-1 px-4 border">Streak ID</th>
                  <th className="py-1 px-4 border">Current Streak No</th>
                  <th className="py-1 px-4 border">Start Date</th>
                  <th className="py-1 px-4 border">Today Date</th>
                  <th className="py-1 px-4 border">Rewards Milestone</th>
                  <th className="py-1 px-4 border">Rewards Details</th>
                  <th className="py-1 px-4 border">Membership ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredStreaks.length > 0 ? (
                  filteredStreaks.map((streak) => (
                    <tr key={streak.Streak_ID} className="hover:bg-gray-100">
                      <td className="py-3 px-6 border text-center">
                        {streak.Streak_ID}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Current_Streak_No}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Start_Date}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Today_Date}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Rewards_Milestone}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Rewards_Details}
                      </td>
                      <td className="py-3 px-6 border text-center">
                        {streak.Membership_ID}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-6 px-6 border text-center" colSpan={7}>
                      No streak records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
