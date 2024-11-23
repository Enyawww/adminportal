"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiLoader, FiLogOut } from "react-icons/fi";

export const Plan = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogout = () => {
    setLoading(true); // Set loading to true when logout starts

    // Remove the stored data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");

    // Redirect the user to the root where they will be redirected to login after a delay
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="flex fixed flex-col h-15 border-t px-2 pt-2 border-stone-300 justify-end text-xs"> 
      <div className="flex items-center justify-between gap-10">
      <div>
        <p className="font-semibold text-sm mb-0">Enterprise</p> {/* Removes bottom margin */}
        <p className="text-stone-500 mt-0.5">Pay as you go</p> {/* Adds a small top margin */}
      </div>
  
        <button
          onClick={handleLogout}
          disabled={loading} // Disable button while loading
          className={`px-2 py-1.5 font-medium rounded transition-colors ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-stone-200 hover:bg-stone-300"
          }`}
        >
          {loading ? (
            <>
              <div className="flex items-center gap-2">
                <FiLoader className="animate-spin" /> Logging out...
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <FiLogOut /> Logout
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
  
};
