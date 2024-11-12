"use client";
import { ChevronDown, Power, Settings, User } from "lucide-react";
import React, { useState } from "react";
import ThemeSwitch from "./Switch";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative pr-[3%]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 md:gap-2 cursor-pointer"
      >
        <div className="size-8 bg-gray-400 rounded-full"></div>
        <div className="max-md:hidden">
          <h3 className="capitalize heading3">Emmanuel Adewale</h3>
          <p className="capitalize text-xs">Super admin</p>
        </div>
        <ChevronDown
          strokeWidth={1.3}
          className={`size-4 md:size-5 duration-200 transition ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {/**Profile Card Info */}
      {isOpen && (
        <div
          className={`absolute w-[220px] max-md:left-[-170px] text-sm myShadow rounded-lg z-30 bg-white ${
            isOpen && "animate-slide-up"
          }`}
        >
          <div className="flex items-center gap-2 p-3 border-b">
            <div className="size-8 bg-gray-400 rounded-full"></div>
            <div>
              <p className="capitalize heading3">Emmanuel Adewale</p>
              <p className="capitalize text-xs text-text-1">Super admin</p>
            </div>
          </div>
          <div className="border-b">
            <div className="flex items-center gap-2 p-3">
              <User strokeWidth={1.3} size={20} />
              <p>My Profile</p>
            </div>
            <div className="flex items-center gap-2 p-3">
              <Settings strokeWidth={1.3} size={20} />
              <p>Settings</p>
            </div>
            <ThemeSwitch className="p-3" />
          </div>
          <div>
            <div className="flex items-center gap-2 p-2 text-red-500">
              <Power strokeWidth={1.3} size={16} />
              <p className="!text-red-500">Logout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
