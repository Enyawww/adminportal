"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import {
  FiAward,
  FiDollarSign,
  FiGift,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";
import { IconType } from "react-icons/lib";

export const RouteSelect = () => {
  const router = useRouter();

  return (
    <div className="space-y-1">
      {/* Update the onClick to direct to the correct path */}
      <Route Icon={FiHome} selected={false} title="Analysis" onClick={() => router.push('/MainPage')} />
      <Route Icon={FiUsers} selected={true} title="Manage Account" onClick={() => router.push('/ManageAccount')} />
      <Route Icon={FiGift} selected={false} title="Voucher" onClick={() => router.push('/Voucher')} />
      <Route Icon={FiPaperclip} selected={false} title="Advertisement" onClick={() => router.push('/Advertisement')} />
      <Route Icon={FiLink} selected={false} title="Feedback" onClick={() => router.push('/Feedback')} />
      <Route Icon={FiAward} selected={false} title="Points" onClick={() => router.push('/Points')} />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected 
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className="text-purple-900" />
      <span>{title}</span>
    </button>
  );
};
