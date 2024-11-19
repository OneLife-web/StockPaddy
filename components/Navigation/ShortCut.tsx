"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ShortCut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openProductModal, openSalesModal } = useSideNav();
  return (
    <div className="fixed right-10 bottom-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-400 size-14 myShadow myFlex rounded-full text-white"
      >
        <Plus
          className={`${
            isOpen
              ? "rotate-45 duration-150 ease-out"
              : "-rotate-0 duration-150 ease-out"
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute w-[220px] border -top-[160px] left-[-170px] text-sm myShadow rounded-[8px] z-50 bg-white ${
            isOpen && "animate-slide-up"
          }`}
        >
          <div className="grid px-3">
            <button
              onClick={() => {
                setIsOpen(false);
                openProductModal();
              }}
              className="border-b heading3 py-3 text-start px-2"
            >
              Add New Product
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                openSalesModal();
              }}
              className="border-b heading3 py-3 text-start px-2"
            >
              Add New Sale
            </button>
            <Link href="/pos" className="heading3 py-3 text-start px-2">
              POS
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortCut;
