"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

const ShortCut = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed right-10 bottom-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-400 size-14 myShadow myFlex rounded-full text-white"
      >
        <Plus
          className={`${isOpen ? "animate-rotateIn" : "animate-rotateIn"}`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute w-[220px] border -top-[150px] max-md:left-[-170px] text-sm myShadow rounded-lg z-50 bg-white ${
            isOpen && "animate-slide-up"
          }`}
        >
          <div className="grid px-3">
            <button className="border-b heading3 py-3 text-start px-2">Add New Product</button>
            <button className="border-b heading3 py-3 text-start px-2">Add New Sale</button>
            <button className="border-b heading3 py-3 text-start px-2">POS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortCut;
