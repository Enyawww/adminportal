"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiCommand, FiStar } from "react-icons/fi";
import { CommandMenu } from "./CommandMenu";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Search Input Box */}
      <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
        <FiSearch className="mr-2" />
        <input
          onFocus={(e) => {
            e.target.blur();
            setOpen(true);
          }}
          type="text"
          placeholder="Type..."
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />

        {/* StreakUp Button */}
        <button 
          className="p-1 text-xs flex gap-1.5 items-center shadow bg-stone-50 rounded absolute right-1.5 hover:bg-purple-600 transition-colors hover:animate-bounce hover:text-orange-400 hover:p-2"
        >
          <FiCommand className="hover:animate-spin" />
          StreakUp
        </button>
      </div>

      {/* Command Menu */}
      <CommandMenu open={open} setOpen={setOpen} />     
    </>
  );
};
