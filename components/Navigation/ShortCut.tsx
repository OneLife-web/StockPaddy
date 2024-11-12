"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

const ShortCut = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button className="bg-orange-400 size-14 myShadow myFlex rounded-full text-white">
      <Plus />
    </button>
  );
};

export default ShortCut;
