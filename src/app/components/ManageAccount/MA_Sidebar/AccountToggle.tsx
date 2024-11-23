"use client";
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from 'next/navigation';

export const AccountToggle = () => {
  const router = useRouter();
  const [username, setUsername] = useState(''); // State to store username

  useEffect(() => {
    // Fetch the username from localStorage and set it to state
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Redirect to login if no username is found
      router.push('/');
    }
  }, [router]); // Empty dependency array to run on mount only

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img 
          src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Kurt&hatColor=Blue01&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' 
          alt="avatar"
          className="size-8 rounded shrink-0 bg-purple-200 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">{username}</span> {/* Display username */}
          <span className="text-xs block text-stone-500">Super Admin</span>
        </div>
        {/* <FiChevronDown className="absolute right-2 top-1/2 text-xs"/>
        <FiChevronUp className="absolute right-2 top-1/3 text-xs"/> */}
      </button>
    </div>
  );
};
