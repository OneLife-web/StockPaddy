"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

const ShortCut = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute right-10 bottom-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-400 size-14 myShadow myFlex rounded-full text-white"
      >
        <Plus
          className={`${
            isOpen ? "animate-rotateIn" : "animate-rotateIn"
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute w-[220px] -top-20 max-md:left-[-170px] text-sm myShadow rounded-lg z-50 bg-white ${
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
        </div>
      )}
    </div>
  );
};

export default ShortCut;
