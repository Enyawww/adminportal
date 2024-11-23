"use client";
import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { FaFire } from "react-icons/fa6";

export const TopBar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update the date every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Formatting the date
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Formatting the time
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Welcome and Date */}
        <div>
          <span className="text-base font-semibold flex items-center gap-1.5">
            Welcome back, let's StreakUp <FaFire className="text-lg text-violet-600 animate-pulse hover:text-orange-500 hover:animate-bounce"/>
          </span>
          <div className="text-xs text-stone-500">
            <div className="flex items-center gap-1 pt-1">
              <FiCalendar /> {formattedDate}
            </div>
            <div className="flex items-center gap-1 pt-1">
              <FiClock /> {formattedTime}
            </div>
          </div>
        </div>

        {/* Calendar Button */}
        <div className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </div>
      </div>
    </div>
  );
};
